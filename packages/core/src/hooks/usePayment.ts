'use client';
import { useState } from 'react';
import type { PaymentConfig, PaymentRequest } from '../types';

export const usePayment = (config: PaymentConfig = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentSession = async (request: PaymentRequest) => {
    setLoading(true);
    setError(null);

    try {
      const baseUrl = config.environment === 'development'
        ? 'https://api-dev.yourservice.com'
        : 'https://api.yourservice.com';

      const response = await fetch(`${baseUrl}/payment/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${request.apiKey}`,
        },
        body: JSON.stringify({
          amount: request.amount,
          currency: request.currency,
          recipient: request.recipient,
          callbackUrl: request.callbackUrl,
          metadata: request.metadata,
        }),
      });

      if (!response.ok) throw new Error('Failed to create payment session');

      const session = await response.json();
      return session;

    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const redirectToCheckout = (sessionId: string, callbackUrl?: string) => {
    const baseUrl = config.environment === 'development'
      ? 'https://api-dev.yourservice.com'
      : 'https://api.yourservice.com';

    const url = `${baseUrl}/checkout/${sessionId}${callbackUrl ? `?callback=${encodeURIComponent(callbackUrl)}` : ''}`;
    window.location.href = url;
  };

  return {
    createPaymentSession,
    redirectToCheckout,
    loading,
    error,
  };
};


