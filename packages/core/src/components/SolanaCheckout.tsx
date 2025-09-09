'use client';
import React, { useEffect, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { CheckoutFlow } from './checkout/CheckoutFlow';
import type { PaymentConfig, PaymentResult } from '../types';
import { injectSdkStyles } from '../utils/injectStyles';


interface SolanaCheckoutProps {
  sessionId: string;
  config?: PaymentConfig;
  onSuccess?: (result: PaymentResult) => void;
  onError?: (error: string) => void;
}

export const SolanaCheckout: React.FC<SolanaCheckoutProps> = ({
  sessionId,
  config = {},
  onSuccess,
  onError,
}) => {
  useEffect(() => {
    injectSdkStyles();
  }, []);
  const network = config.network || 'mainnet-beta';
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);



  return (
    <div className={`solana-checkout-container theme-${config.theme || 'light'}`}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <CheckoutFlow
              sessionId={sessionId}
              config={config}
              {...(onSuccess ? { onSuccess } : {})}
              {...(onError ? { onError } : {})}
            />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};


