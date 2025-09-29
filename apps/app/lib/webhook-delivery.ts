import crypto from 'crypto';
import { decryptData } from './helpers';
import prisma from '@/db';

export interface WebhookEventPayload {
  id: string;
  type: 'PAYMENT_CONFIRMED' | 'PAYMENT_FAILED' | 'PAYMENT_PENDING';
  createdAt: string;
  data: {
    sessionId: string;
    paymentId: string;
    amount: number;
    currency?: string;
    network?: string;
    status?: string;
    metadata?: any;
    walletAddress?: string;
    tokenMint?: string;
    transactionSignature?: string;
    blockNumber?: number;
    confirmedAt?: string;
    products?: Array<{
      id: string;
      name: string;
      price: number;
      metadata?: any;
    }>;
  };
}

export function computeWebhookSignature(payload: string, secret: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');
  return `t=${timestamp},v1=${signature}`;
}

export async function deliverWebhook(
  eventId: string,
  endpointId: string,
  payload: WebhookEventPayload
): Promise<{ success: boolean; httpStatusCode?: number; errorMessage?: string; responseBody?: string }> {
  try {
    // Get webhook endpoint details
    const endpoint = await prisma.webhookEndpoint.findUnique({
      where: { id: endpointId },
    });

    if (!endpoint || endpoint.status !== 'ACTIVE') {
      throw new Error('Webhook endpoint not found or inactive');
    }

    // Decrypt the webhook secret
    const decryptedSecret = await decryptData<string>(endpoint.secret);
    
    // Create the payload
    const payloadString = JSON.stringify(payload);
    const signature = computeWebhookSignature(payloadString, decryptedSecret);

    // Make the HTTP request
    const response = await fetch(endpoint.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Okito-Webhook/1.0',
        'X-Okito-Signature': signature,
        'X-Okito-Event-Id': eventId,
        'X-Okito-Event-Type': payload.type,
      },
      body: payloadString,
      // Add timeout
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    const responseBody = await response.text();

    // Update webhook endpoint last hit time
    await prisma.webhookEndpoint.update({
      where: { id: endpointId },
      data: { lastTimeHit: new Date() },
    });

    // Create event delivery record
    await prisma.eventDelivery.create({
      data: {
        eventId,
        endpointId,
        deliveryStatus: response.ok ? 'DELIVERED' : 'FAILED',
        httpStatusCode: response.status,
        responseBody: responseBody.slice(0, 1000), // Limit response body size
        deliveredAt: response.ok ? new Date() : null,
        errorMessage: response.ok ? null : `HTTP ${response.status}: ${response.statusText}`,
      },
    });

    return {
      success: response.ok,
      httpStatusCode: response.status,
      responseBody: responseBody.slice(0, 1000),
      errorMessage: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`,
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Create event delivery record for failed delivery
    await prisma.eventDelivery.create({
      data: {
        eventId,
        endpointId,
        deliveryStatus: 'FAILED',
        errorMessage,
      },
    });

    return {
      success: false,
      errorMessage,
    };
  }
}

export async function deliverWebhookToAllEndpoints(
  eventId: string,
  projectId: string,
  eventType: 'PAYMENT_CONFIRMED' | 'PAYMENT_FAILED' | 'PAYMENT_PENDING',
  payload: WebhookEventPayload
): Promise<void> {
  // Map webhook event type to database event type
  const dbEventType = eventType === 'PAYMENT_CONFIRMED' ? 'PAYMENT_COMPLETED' : eventType;
  
  // Find all active webhook endpoints for this project that should receive this event type
  const endpoints = await prisma.webhookEndpoint.findMany({
    where: {
      projectId,
      status: 'ACTIVE',
      OR: [
        { eventTypes: { isEmpty: true } }, // Empty array means receive all events
        { eventTypes: { has: dbEventType as any } }, // Specific event type
      ],
    },
  });

  // Deliver to all endpoints in parallel
  const deliveryPromises = endpoints.map(endpoint =>
    deliverWebhook(eventId, endpoint.id, payload)
      .catch(error => {
        console.error(`Failed to deliver webhook to endpoint ${endpoint.id}:`, error);
        return { success: false, errorMessage: error.message };
      })
  );

  await Promise.allSettled(deliveryPromises);
}
