"use client";

import  { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import OkitoButton from './wallet-button';
import { pay } from "../logic/pay";
import { getStoredConfig } from "../logic/config";
import { Check, AlertCircle, ExternalLink, Zap, Loader2, CreditCard, X } from 'lucide-react';
import { toast } from 'sonner';
import { OkitoAssets } from '../assets';
import axios from 'axios';



export type PayWithCryptoProps = {
    amount: number;
    onSuccess?: (signature: string) => void;
    onError?: (error: Error) => void;
    className?: string;
    label?: string;
    metadata?: {user_id: string, subscription_level: string};
  }




export  function PayWithCrypto({
  amount,
  onSuccess,
  onError,
  className = "",
  label = "Pay with Crypto",
  metadata = {
    user_id: "",
    subscription_level:"premium"
  }
}: Omit<PayWithCryptoProps, 'theme'>) {
  const wallet = useWallet();
  const { connected, publicKey } = wallet;
  const config = getStoredConfig();

  const [selectedToken, setSelectedToken] = useState<'USDC' | 'USDT'>('USDC');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const paymentMutation = useMutation({
    mutationFn: async () => {
      if (!publicKey) throw new Error('Wallet not connected');
        return pay(wallet, amount, selectedToken, config);
    },
    onSuccess: async (signature) => {
      toast.success('Payment completed successfully!');
      try{
        await axios.post(`${process.env.OKITO_API_URL}/api/v1/payments`, {
          txid: signature,
          metadata: {
            txHash: signature,
            merchantMetadata: metadata
          }
        });
      }
      catch(error){
        console.error(error);
      }
      onSuccess?.(signature);
    },
    onError: (error) => {
      toast.error(`Payment failed: ${error.message}`);
      onError?.(error as Error);
    }
  });

  const handlePayment = () => {
    if (!connected) return;
    paymentMutation.mutate();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    paymentMutation.reset();
  };

  const getModalTitle = () => {
    if (!connected) return 'Connect Wallet';
    if (paymentMutation.isSuccess) return 'Payment Complete';
    return 'Complete Payment';
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="default"
        size="default"
        className={`crypto-glass shadow-md bg-primary/10 hover:bg-primary/20 dark:bg-primary/15 dark:hover:bg-primary/25 text-primary transition-all duration-300 ease-out relative ${className}`}
      >
        <CreditCard className="w-4 h-4" />
        {label}
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleModalClose}
          />
          
          <div className="relative w-full max-w-md mx-4">
            <div className="crypto-glass-static bg-white/95 dark:bg-card/95 backdrop-blur-xl border-border/30 dark:border-border/50  p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{getModalTitle()}</h2>
                  {(!connected && <p className="text-sm text-muted-foreground mt-1">Choose your preferred wallet to pay securely</p>)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleModalClose}
                  className="rounded-full hover:bg-black/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              
              {!connected ? (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 crypto-glass shadow-md rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Connect Wallet to Pay
                    </h3>
                    <p className="text-muted-foreground">
                      Secure, fast payments with cryptocurrency
                    </p>
                  </div>
                  <OkitoButton />
                </div>
              ) : paymentMutation.isSuccess ? (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 crypto-glass shadow-md rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-green-500 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Payment Successful!
                    </h3>
                    <p className="text-muted-foreground">
                      Your transaction has been confirmed on the blockchain
                    </p>
                  </div>
                  {paymentMutation.data && (
                    <Button
                      variant="outline"
                      asChild
                      className="crypto-glass shadow-md"
                    >
                      <a
                        href={`https://explorer.solana.com/tx/${paymentMutation.data}?cluster=${config.network}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        View Transaction <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  <Button
                    onClick={handleModalClose}
                    className="w-full crypto-glass shadow-md"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">

                  <Card className="relative shadow-lg crypto-glass">
                    <CardContent className="p-6 relative">
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
                          <CreditCard className="w-4 h-4 text-primary" />
                          <span>Payment Amount</span>
                        </div>
                        <div className="text-4xl mt-4 font-bold text-foreground">
                          ${amount.toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <label className="text-sm font-semibold text-foreground">
                        Payment accepted in:
                      </label>
                    </div>
                    <div className="flex gap-4 justify-center">
                      {config.tokens.map((token) => {
                        const tokenImg =
                          token === "USDC"
                            ? OkitoAssets.coins.usdc
                            : token === "USDT"
                            ? OkitoAssets.coins.usdt
                            : "";
                 
                        return (
                          <Button
                            key={token}
                            variant="outline"
                            onClick={() => setSelectedToken(token)}
                            className={`flex-1 min-w-0 h-20 crypto-glass-static hover:text-primary shadow-md transition-all duration-300 `}
                          >
                            <div className="w-full text-center space-y-1 ">
                              <div className="text-xl font-bold flex items-center justify-center gap-2 ">
                                <img src={tokenImg} alt={token} width={24} height={24} />
                                {token}
                              </div>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {paymentMutation.isError && (
                    <Card className="crypto-glass shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-red-800 dark:text-red-200">
                              Payment Failed
                            </h4>
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                              {paymentMutation.error?.message || 'An error occurred during payment'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      onClick={handlePayment}
                      disabled={paymentMutation.isPending}
                      className="w-full h-14 text-lg font-semibold crypto-glass-static shadow-lg bg-primary text-black dark:text-primary-foreground hover:bg-primary/90 hover:text-primary transition-all duration-300 relative"
                    >
                      <div className="relative flex items-center justify-center gap-3">
                        {paymentMutation.isPending ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Processing Payment...</span>
                          </>
                        ) : (
                          <>
                           
                            <span>Pay with {selectedToken}</span>
                          </>
                        )}
                      </div>
                    </Button>
                    <div className="pt-3 ">
                      <div className="text-center flex items-center justify-center gap-2">
                        <a 
                          href="https://okito.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          <span className='flex items-center gap-2'>
                            Powered by <img src={OkitoAssets.logo} alt="Okito" width={64} height={64} />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}