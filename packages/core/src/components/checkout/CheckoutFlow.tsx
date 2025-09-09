'use client';
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import type { PaymentConfig, PaymentResult } from '../../types';
import type { SignerWallet } from '@okito/sdk';
import { pay } from '../../pay';

interface CheckoutFlowProps {
  sessionId: string;
  config: PaymentConfig;
  onSuccess?: (result: PaymentResult) => void;
  onError?: (error: string) => void;
}

export const CheckoutFlow: React.FC<CheckoutFlowProps> = ({
  sessionId,
  config,
  onSuccess,
  onError,
}) => {
  const [session, setSession] = useState<any>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'processing' | 'success' | 'error'>('loading');
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wallet = useWallet();
  const { publicKey, connected } = wallet;

  const baseUrl = config.apiBaseUrl || (config.environment === 'development'
    ? 'https://api-dev.yourservice.com'
    : 'https://api.yourservice.com');

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  const fetchSession = async () => {
    try {
      const response = await fetch(`${baseUrl}/payment/session/${sessionId}`);
      if (!response.ok) throw new Error('Session not found');

      const sessionData = await response.json();
      setSession(sessionData);
      setStatus('ready');
    } catch (err) {
      const errorMsg = 'Failed to load payment session';
      setError(errorMsg);
      setStatus('error');
      onError?.(errorMsg);
    }
  };

  const handlePayment = async () => {
    if (!connected || !publicKey || !session) return;

    setStatus('processing');
    setError(null);

    try {
      const connection = new Connection(
        session.network === 'devnet' ? clusterApiUrl('devnet') : clusterApiUrl('mainnet-beta')
      );

      const signerWallet: SignerWallet = {
        publicKey: publicKey,
        signTransaction: async (tx: any) => {
          const adapter: any = (wallet as any).wallet?.adapter || (wallet as any).adapter || wallet;
          if (!adapter?.signTransaction) throw new Error('Wallet does not support signTransaction');
          return await adapter.signTransaction(tx);
        },
      } as unknown as SignerWallet;

      const signature = await pay(
        connection,
        signerWallet,
        session.amount,
        session.token,
        session.walletAddress,
        session.sessionId,
        session.network
      );

      setTxHash(signature);
      setStatus('success');

      const result: PaymentResult = {
        success: true,
        txHash: signature,
        sessionId,
      };

      onSuccess?.(result);

      const urlParams = new URLSearchParams(window.location.search);
      const cb = urlParams.get('callback');

      if (cb) {
        setTimeout(() => {
          window.location.href = `${cb}?txHash=${signature}&sessionId=${sessionId}&success=true`;
        }, 3000);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Payment failed';
      setError(errorMsg);
      setStatus('error');
      onError?.(errorMsg);
    }
  };

  if (status === 'loading') {
    return (
      <div className="okito-grid two-col" style={{ position: 'relative' }}>
        <div className="okito-col okito-gradient">
          <div className="okito-gradient-content">
            <div className="badge-secure">Secure by Okito</div>
            <h2 className="gradient-text-updated">Solana Payment</h2>
            <p>Preparing your checkout...</p>
          </div>
        </div>
        <div className="okito-col okito-pane">
          <div className="checkout-loading crypto-base">
            <div className="loading-spinner" />
            <p>Loading payment details...</p>
          </div>
        </div>
        <div style={{ position: 'absolute', right: 16, bottom: 12, opacity: 0.8, fontSize: 12 }}>Powered by Okito</div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="okito-grid two-col" style={{ position: 'relative' }}>
        <div className="okito-col okito-gradient">
          <div className="okito-gradient-content">
            <div className="badge-secure">Secure by Okito</div>
            <h2 className="gradient-text-updated">Payment Issue</h2>
            <p>Please try again.</p>
          </div>
        </div>
        <div className="okito-col okito-pane">
          <div className="checkout-error crypto-base">
            <div className="error-icon">❌</div>
            <h3>Payment Error</h3>
            <p>{error}</p>
            <button className="crypto-button" onClick={() => window.history.back()}>Go Back</button>
          </div>
        </div>
        <div style={{ position: 'absolute', right: 16, bottom: 12, opacity: 0.8, fontSize: 12 }}>Powered by Okito</div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="okito-grid two-col" style={{ position: 'relative' }}>
        <div className="okito-col okito-gradient">
          <div className="okito-gradient-content">
            <div className="badge-secure">Secure by Okito</div>
            <h2 className="gradient-text-updated">Thank you!</h2>
            <p>Payment confirmed.</p>
          </div>
        </div>
        <div className="okito-col okito-pane">
          <div className="checkout-success crypto-base">
            <div className="success-icon">✅</div>
            <h3>Payment Successful!</h3>
            <p>Your transaction has been completed.</p>
            {txHash && (
              <div className="tx-details">
                <p>Transaction Hash:</p>
                <code>{txHash}</code>
                <a
                  href={`https://solscan.io/tx/${txHash}${config.network === 'devnet' ? '?cluster=devnet' : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Solscan →
                </a>
              </div>
            )}
          </div>
        </div>
        <div style={{ position: 'absolute', right: 16, bottom: 12, opacity: 0.8, fontSize: 12 }}>Powered by Okito</div>
      </div>
    );
  }

  return (
    <div className="okito-grid two-col" style={{ position: 'relative' }}>
      <div className="okito-col okito-gradient">
        <div className="okito-gradient-content">
          <div className="badge-secure">Secure by Okito</div>
          <h2 className="gradient-text-updated">Solana Payment</h2>
          <p>Fast, secure, low-fee crypto payments.</p>
        </div>
      </div>
      <div className="okito-col okito-pane">
        <div className="checkout-ready crypto-glass">
          <div className="payment-header">
            <h2>Complete Payment</h2>
            <p>Review and confirm your payment</p>
          </div>

          {session && (
            <div className="payment-details">
              <div className="detail-row">
                <span>Amount:</span>
                <strong>{session.amount} {session.token || session.currency}</strong>
              </div>
              <div className="detail-row">
                <span>To:</span>
                <code>{(session.walletAddress || session.recipient).slice(0, 8)}...{(session.walletAddress || session.recipient).slice(-8)}</code>
              </div>
            </div>
          )}

          <div className="wallet-section">
            {!connected ? (
              <div>
                <p>Connect your wallet to proceed:</p>
                <WalletMultiButton />
              </div>
            ) : (
              <button
                onClick={handlePayment}
                disabled={status === 'processing'}
                className="crypto-button pay-button"
              >
                {status === 'processing' ? 'Processing...' : 'Pay Now'}
              </button>
            )}
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', right: 16, bottom: 12, opacity: 0.8, fontSize: 12 }}>Powered by Okito</div>
    </div>
  );
};


