'use client';
import React, { useState, useMemo } from 'react';

const BASE_OKITO_CHECKOUT_URL = "http://checkout.okito.dev"

// Product type
type Product = {
  id?: string;
  name: string;
  price: number;
  description?: string;
  quantity?: number;
  metadata?: Record<string, any>;
};

// Config interface
interface BuyButtonConfig {
  backendUrl: string;
  callbackUrl: string;
  metadata?: Record<string, any>;
  products: Product[];
}

// Theme variants for quick styling
type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

// Main component props
interface BuyButtonProps {
  label?: string;
  className?: string;
  disabled?: boolean;
  config: BuyButtonConfig;
  // Callbacks
  onError?: (error: string) => void;
  onSuccess?: (sessionId: string) => void;
  // Quick styling options
  variant?: ButtonVariant;
  size?: ButtonSize;
  // Full custom styling (overrides variant/size)
  style?: React.CSSProperties;
}

// Default styles as JavaScript objects - no CSS injection needed
const getButtonStyles = (
  variant: ButtonVariant = 'default',
  size: ButtonSize = 'md',
  disabled: boolean = false,
  loading: boolean = false
): React.CSSProperties => {
  
  // Size styles
  const sizeStyles = {
    sm: {
      height: '32px',
      padding: '0 12px',
      fontSize: '13px',
      borderRadius: '4px',
    },
    md: {
      height: '40px',
      padding: '0 16px',
      fontSize: '14px',
      borderRadius: '6px',
    },
    lg: {
      height: '48px',
      padding: '0 24px',
      fontSize: '16px',
      borderRadius: '8px',
    },
  };

  // Variant styles
  const variantStyles = {
    default: {
      backgroundColor: '#9945FF',
      color: '#ffffff',
      border: 'none',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#9945FF',
      border: '1px solid #9945FF',
      boxShadow: 'none',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#9945FF',
      border: 'none',
      boxShadow: 'none',
    },
    destructive: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      border: 'none',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
  };

  // Base styles that apply to all buttons
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    fontWeight: '600',
    transition: 'all 0.2s ease-in-out',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'none',
    outline: 'none',
    lineHeight: '1',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  // Disabled state
  if (disabled || loading) {
    baseStyles.opacity = 0.5;
    baseStyles.pointerEvents = 'none';
  }

  return baseStyles;
};

// Hover styles (applied via onMouseEnter/Leave since we can't use :hover in inline styles)
const getHoverStyles = (variant: ButtonVariant): React.CSSProperties => {
  const hoverStyles = {
    default: {
      backgroundColor: '#7c3aed',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(153, 69, 255, 0.3)',
    },
    outline: {
      backgroundColor: '#f3f4f6',
      transform: 'translateY(-1px)',
    },
    ghost: {
      backgroundColor: '#f3f4f6',
    },
    destructive: {
      backgroundColor: '#dc2626',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    },
  };

  return hoverStyles[variant];
};

export const BuyButton: React.FC<BuyButtonProps> = ({
  label = 'Pay Now',
  className = '',
  disabled = false,
  config,
  onError,
  onSuccess,
  variant = 'default',
  size = 'md',
  style,
}) => {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Normalize and validate products
  const normalizedProducts = useMemo(() => {
    return config.products.map((product, index) => {
      const price = Number(product.price);
      const quantity = Number(product.quantity) || 1;
      
      if (price <= 0) {
        throw new Error(`Product "${product.name}" must have price > 0`);
      }
      
      return {
        id: product.id || `product_${index}`,
        name: product.name,
        price: price,
        description: product.description,
        quantity: quantity,
        metadata: product.metadata,
      };
    });
  }, [config.products]);

  const handlePayment = async () => {
    if (disabled || loading) return;

    setLoading(true);
    try {
      const payload = {
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
      const sessionId = data?.sessionId;
      
      if (!sessionId) {
        throw new Error('No session ID returned from checkout');
      }

      onSuccess?.(sessionId);
      
      const checkoutUrl = `${BASE_OKITO_CHECKOUT_URL}/checkout/${sessionId}?callback=${encodeURIComponent(config.callbackUrl)}`;
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

  const isDisabled = disabled || loading;

  // Combine base styles with hover effects and user overrides
  const buttonStyles: React.CSSProperties = {
    ...getButtonStyles(variant, size, isDisabled, loading),
    ...(isHovered && !isDisabled ? getHoverStyles(variant) : {}),
    ...style, // User styles take precedence
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isDisabled}
      className={className}
      style={buttonStyles}
      type="button"
      aria-label={loading ? 'Processing payment...' : label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {loading ? 'Processing...' : label}
    </button>
  );
};
