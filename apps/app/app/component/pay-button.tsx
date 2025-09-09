"use client";

import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import OkitoModal from './wallet-modal';
import { PaymentIntentResponse } from '@okito/sdk'; 
import { 
  Check, 
  AlertCircle, 
  ExternalLink, 
  Loader2, 
  ChevronDown,
  ArrowLeft,
  Copy
} from 'lucide-react';
import { toast } from 'sonner';
import { OkitoAssets } from '@/assets';
import { pay } from './pay';
import { useOkito } from './useOkito';
import Loader from './loader';

export type PayWithCryptoProps = {
  amount: number;
  onSuccess?: (signature: string) => void;
  onError?: (error: Error) => void;
  className?: string;
  label?: string;
  metadata?: {user_id: string, subscription_level: string};
}

export function PayWithCrypto({
  amount,
  onSuccess,
  onError,
  className = "",
  label = "Pay with Crypto",
  metadata = {
    user_id: "",
    subscription_level: "premium"
  }
}: Omit<PayWithCryptoProps, 'theme'>) {
  const okito = useOkito();
  const wallet = useWallet();
  const {connection} = useConnection();
  const [selectedToken, setSelectedToken] = useState<'USDC' | 'USDT'>('USDC');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false);
  const [step, setStep] = useState<'details' | 'confirm'>('details');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntentResponse | null>(null);
  const [transactionSignature, setTransactionSignature] = useState<string | null>(null);
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const resetModal = () => {
    setStatus('idle');
    setStep('details');
    setPaymentIntent(null);
    setTransactionSignature(null);
    setIsCreatingIntent(false);
    setError(null);
  };

  const handleModalOpen = () => {
    resetModal();
    // If wallet is not connected, open wallet modal first
    if (!okito.isWalletConnected) {
      setIsWalletModalOpen(true);
    } else {
      // If wallet is connected, open payment modal directly
      setIsModalOpen(true);
    }
  };

  const handleWalletConnected = () => {
    setIsWalletModalOpen(false);
    setIsModalOpen(true);
  };

  const handleCreateIntent = async () => {
    try {
      setIsCreatingIntent(true);
      setError(null);
      
      const intent = await okito.createPaymentIntent(amount, selectedToken, {
        userId: metadata.user_id,
        subscriptionLevel: metadata.subscription_level
      });
      setPaymentIntent(intent.response);
      setStep('confirm');
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
      toast.error(`Could not create payment intent: ${errorMessage}`);
    } finally {
      setIsCreatingIntent(false);
    }
  };

  const handlePayNow = async () => {
    try {
      setError(null);
      setStatus('processing');

      if (!paymentIntent || !paymentIntent.walletAddress || !paymentIntent.sessionId) {
        setStatus('error');
        const errMsg = 'Missing payment destination. Please go back and recreate the payment intent.';
        setError(errMsg);
        toast.error(errMsg);
        return;
      }

      const signature = await pay(
        connection,
        wallet as any,
        amount,
        selectedToken,
        paymentIntent.walletAddress,
        paymentIntent.sessionId,
        metadata
      );

      setTransactionSignature(signature);
      setStatus('success');
      toast.success('Payment completed successfully!');
      onSuccess?.(signature);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
      setStatus('error');
      toast.error(`Payment failed: ${errorMessage}`);
      onError?.(error as Error);
    }
  };

  return (
    <>
      <Button
        onClick={handleModalOpen}
        variant="default"
        size="default"
        className={`crypto-glass ${className}`}
      >
        <div className="flex items-center gap-2">
          {label}
        </div>
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="crypto-base max-w-md p-0 gap-0 border-none bg-background">
          {/* Header */}
          <DialogHeader className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <DialogTitle className="text-xl font-semibold">
                  {status === 'processing' && 'Processing Payment'}
                  {status === 'success' && 'Payment Complete'}
                  {status === 'error' && 'Payment Failed'}
                  {status === 'idle' && step === 'details' && 'Review Details'}
                  {status === 'idle' && step === 'confirm' && 'Confirm Payment'}
                </DialogTitle>
          
              </div>
        
            </div>
          </DialogHeader>

          <div className="px-6 pb-6">
            {/* Enhanced Content */}
            <div className="space-y-8">

              {/* Step: Details */}
              {status === 'idle' && step === 'details' && (
                <div className="space-y-6">
                  <Card className="crypto-glass-static">
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="text-3xl font-bold text-foreground">
                          ${amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Membership: <span className="font-medium text-foreground">{metadata.subscription_level}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <DropdownMenu open={isTokenDropdownOpen} onOpenChange={setIsTokenDropdownOpen}>
                            <DropdownMenuTrigger className='crypto-button' asChild>
                              <Button variant="outline" size="sm" className="h-8 px-3">
                                <img 
                                  src={selectedToken === 'USDC' ? OkitoAssets.coins.usdc : OkitoAssets.coins.usdt} 
                                  alt={selectedToken} 
                                  width={16} 
                                  height={16} 
                                />
                                <span className="ml-2">{selectedToken}</span>
                                <ChevronDown className="w-3 h-3 ml-1" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='crypto-glass-static' align="center">
                              {['USDC','USDT'].map((token) => (
                                <DropdownMenuItem
                                  key={token}
                                  onClick={() => setSelectedToken(token as 'USDC' | 'USDT')}
                                >
                                  <img 
                                    src={token === 'USDC' ? OkitoAssets.coins.usdc : OkitoAssets.coins.usdt} 
                                    alt={token} 
                                    width={16} 
                                    height={16} 
                                  />
                                  <span className="ml-2">{token}</span>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    onClick={handleCreateIntent}
                    disabled={isCreatingIntent}
                    className="w-full h-12  crypto-input font-medium"
                    size="lg"
                  >
                    {isCreatingIntent && (
                      <Loader size={0.2} className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    {isCreatingIntent ? 'Preparing...' : 'Continue'}
                  </Button>

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Step: Confirm */}
              {status === 'idle' && step === 'confirm' && paymentIntent && (
                <div className="space-y-6">
                  <Card className="crypto-glass-static">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <Badge className='' variant="outline">{paymentIntent.network}</Badge>
                        <Badge variant="outline">{selectedToken}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Network</div>
                        <div className="text-sm font-medium">{paymentIntent.network}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Amount</div>
                        <div className="text-sm font-medium">${amount.toFixed(2)} {selectedToken}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Membership</div>
                        <div className="text-sm font-medium">{metadata.subscription_level}</div>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm text-muted-foreground">Destination</div>
                        <div className="flex items-center gap-2 text-right">
                          <div className="text-sm font-medium break-all">{paymentIntent.walletAddress.slice(0, 6)}...{paymentIntent.walletAddress.slice(-6)}</div>
               
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-2">
           
                    <Button
                      onClick={handlePayNow}
                      disabled={false}
                      className="h-12 flex-1 crypto-input font-medium"
                    >
                      Pay Now
                    </Button>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Processing */}
              {status === 'processing' && (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Processing Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      Please confirm the transaction in your wallet and wait for blockchain confirmation
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    ${amount.toFixed(2)} {selectedToken}
                  </div>
                </div>
              )}

              {/* Success */}
              {status === 'success' && (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-green-600">Payment Successful!</h3>
                    <p className="text-sm text-muted-foreground">
                      Your transaction has been confirmed on the blockchain
                    </p>
                  </div>
                  
                  <Card className="bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20">
                    <CardContent className="p-4">
                      <div className="text-xl font-bold text-green-600">
                        ${amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-green-600/80">
                        Paid with {selectedToken}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    {transactionSignature && (
                      <Button
                        variant="outline"
                        asChild
                        className="w-full"
                      >
                        <a
                          href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=${paymentIntent?.network ?? 'mainnet-beta'}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View on Explorer
                        </a>
                      </Button>
                    )}
                    
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      className="w-full"
                      variant="default"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}

              {/* Error */}
              {status === 'error' && (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-red-600">Payment Failed</h3>
                    <p className="text-sm text-muted-foreground">
                      {error || 'An error occurred while processing your payment'}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => setStatus('idle')}
                      className="w-full"
                      variant="default"
                    >
                      Try Again
                    </Button>
                    
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      className="w-full"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Footer */}
              {status !== 'success' && (
                <>
                  <Separator />
                  <div className="text-center">
                    <a 
                      href="https://okito.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span>Powered by</span>
                      <img src={OkitoAssets.logo} alt="Okito" width={42} height={16} className="opacity-80" />
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Wallet Modal */}
      <OkitoModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)}
        onWalletConnected={handleWalletConnected}
      />
    </>
  );
}