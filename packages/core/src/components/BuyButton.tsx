'use client';
import React, { useState, useMemo } from 'react';

// Product type - simple and clean
type Product = {
  id?: string;
  name: string;
  amount: number;
  description?: string;
  quantity?: number;
};

// Simplified config - only products matter for amount
interface BuyButtonConfig {
  backendUrl: string;
  environment?: 'development' | 'production';
  callbackUrl: string;
  metadata?: Record<string, any>;
  products: Product[]; // Required - amount is calculated from this
}

// Main BuyButton component
interface BuyButtonProps {
  label?: string;
  className?: string;
  disabled?: boolean;
  config: BuyButtonConfig;
  // Callbacks
  onError?: (error: string) => void;
  onSuccess?: (sessionId: string) => void;
}

export const BuyButton: React.FC<BuyButtonProps> = ({
  label = 'Pay Now',
  className = '',
  disabled = false,
  config,
  onError,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  // Normalize and validate products
  const normalizedProducts = useMemo(() => {
    return config.products.map((product, index) => {
      const amount = Number(product.amount);
      const quantity = Number(product.quantity) || 1;
      
      if (amount <= 0) {
        throw new Error(`Product "${product.name}" must have amount > 0`);
      }
      
      return {
        id: product.id || `product_${index}`,
        name: product.name,
        amount: amount,
        description: product.description,
        quantity: quantity,
      };
    });
  }, [config.products]);

  // Calculate total amount from products
  const totalAmount = useMemo(() => {
    return normalizedProducts.reduce((sum, product) => {
      return sum + (product.amount * product.quantity);
    }, 0);
  }, [normalizedProducts]);

  const handlePayment = async () => {
    if (disabled || loading) return;

    if (totalAmount <= 0) {
      onError?.('No products or invalid amounts provided');
      return;
    }

    setLoading(true);
    try {

      // Send clean data to your checkout endpoint
      const payload = {
        amount: totalAmount,
        environment: config.environment || 'production',
        callbackUrl: config.callbackUrl,
        metadata: config.metadata,
        products: normalizedProducts,
      };

      const response = await fetch(config.backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      const sessionId = data?.sessionId || data?.session?.sessionId;
      if (!sessionId) {
        throw new Error('No session ID returned from checkout');
      }

      onSuccess?.(sessionId);
      
      // Redirect to your hosted checkout page
      const checkoutUrl = `/checkout/${sessionId}?callback=${encodeURIComponent(config.callbackUrl)}`;
      
      window.location.href = checkoutUrl;

    } catch (error) {
      let errorMessage = 'Checkout failed';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      onError?.(errorMessage);
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultClasses = [
    'inline-flex items-center justify-center whitespace-nowrap rounded-md',
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'h-10 px-4 py-2 text-sm font-semibold',
    'bg-[#9945FF] text-white hover:bg-[#7b2cff] disabled:hover:bg-[#9945FF]',
  ].join(' ');

  const isDisabled = disabled || loading || totalAmount <= 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Total Display */}
      {totalAmount > 0 && (
        <div className="text-sm text-gray-600">
          Total: <span className="font-semibold">
            ${totalAmount.toFixed(2)} USD
          </span>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={handlePayment}
        disabled={isDisabled}
        className={`${defaultClasses} ${className}`}
        type="button"
      >
        {loading ? 'Processing...' : label}
      </button>
    </div>
  );
};
