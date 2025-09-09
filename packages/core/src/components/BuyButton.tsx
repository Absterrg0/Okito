'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { PaymentConfig } from '../types';
import { injectSdkStyles } from '../utils/injectStyles';

interface BuyButtonProps {
  amount: number;
  currency: 'SOL' | 'USDC' | string;
  callbackUrl?: string;
  metadata?: Record<string, any>;
  children?: any;
  className?: string;
  disabled?: boolean;
  config?: PaymentConfig;
  onError?: (error: string) => void;
}

export const BuyButton: React.FC<BuyButtonProps> = ({
  amount,
  currency,
  callbackUrl,
  metadata,
  children = 'Buy Now',
  className = '',
  disabled = false,
  config = {},
  onError,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    injectSdkStyles();
  }, []);

  const handlePayment = async () => {
    if (disabled || loading) return;

    setLoading(true);
    try {
      const apiBase = (config.apiBaseUrl || '').replace(/\/$/, '');

      // Hit backend entrypoint that creates session and returns { sessionId }
      const payload: Record<string, any> = {
        amount,
        token: currency,
        network: config.network,
        callback: callbackUrl,
        metadata,
      };

      const { data } = await axios.post(`${apiBase}/okito/checkout`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const sid: string | undefined = data?.sessionId || data?.session?.sessionId;
      if (!sid) throw new Error('No sessionId returned from backend');

      const checkoutUrl = `/checkout/${sid}${callbackUrl ? `?callback=${encodeURIComponent(callbackUrl)}` : ''}`;
      window.location.href = checkoutUrl;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      onError?.(errorMessage);
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || loading}
      className={`solana-payment-button ${className}`}
      style={{
        padding: '12px 24px',
        backgroundColor: disabled || loading ? '#ccc' : '#9945FF',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
};


