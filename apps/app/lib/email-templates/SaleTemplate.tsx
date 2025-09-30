import React from 'react';

interface SaleTemplateProps {
  projectName: string;
  customerEmail?: string;
  customerWalletAddress: string;
  amount: number;
  currency: string;
  transactionSignature: string;
  products: Array<{
    name: string;
    price: number;
    quantity?: number;
  }>;
  network: string;
  confirmedAt: string;
}

export const SaleTemplate: React.FC<SaleTemplateProps> = ({
  projectName,
  customerEmail,
  customerWalletAddress,
  amount,
  currency,
  transactionSignature,
  products,
  network,
  confirmedAt
}) => {
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getNetworkDisplayName = (network: string) => {
    switch (network) {
      case 'mainnet-beta':
        return 'Solana Mainnet';
      case 'devnet':
        return 'Solana Devnet';
      default:
        return network;
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '2px solid #e9ecef'
          }}>
            <h1 style={{
              color: '#28a745',
              fontSize: '28px',
              margin: '0 0 10px 0',
              fontWeight: 'bold'
            }}>
              🎉 New Sale Received!
            </h1>
            <p style={{
              color: '#6c757d',
              fontSize: '16px',
              margin: '0'
            }}>
              {projectName}
            </p>
            <p style={{
              color: '#28a745',
              fontSize: '14px',
              margin: '5px 0 0 0',
              fontWeight: '500'
            }}>
              You've received a new payment!
            </p>
          </div>

        {/* Sale Details */}
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          padding: '20px',
          marginBottom: '25px'
        }}>
          <h2 style={{
            color: '#495057',
            fontSize: '20px',
            margin: '0 0 15px 0',
            fontWeight: '600'
          }}>
            Sale Details
          </h2>
          
          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#495057' }}>Amount:</strong>
            <span style={{ 
              color: '#28a745', 
              fontSize: '18px', 
              fontWeight: 'bold',
              marginLeft: '10px'
            }}>
              {formatAmount(amount)} {currency}
            </span>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#495057' }}>Customer Wallet:</strong>
            <span style={{ 
              color: '#007bff',
              fontFamily: 'monospace',
              marginLeft: '10px',
              wordBreak: 'break-all'
            }}>
              {customerWalletAddress}
            </span>
          </div>

          {customerEmail && (
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#495057' }}>Customer Email:</strong>
              <span style={{ color: '#007bff', marginLeft: '10px' }}>
                {customerEmail}
              </span>
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#495057' }}>Network:</strong>
            <span style={{ color: '#6c757d', marginLeft: '10px' }}>
              {getNetworkDisplayName(network)}
            </span>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: '#495057' }}>Transaction:</strong>
            <span style={{ 
              color: '#007bff',
              fontFamily: 'monospace',
              marginLeft: '10px',
              wordBreak: 'break-all'
            }}>
              {transactionSignature}
            </span>
          </div>

          <div>
            <strong style={{ color: '#495057' }}>Confirmed At:</strong>
            <span style={{ color: '#6c757d', marginLeft: '10px' }}>
              {formatDate(confirmedAt)}
            </span>
          </div>
        </div>

        {/* Products */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{
            color: '#495057',
            fontSize: '20px',
            margin: '0 0 15px 0',
            fontWeight: '600'
          }}>
            Products Purchased
          </h2>
          
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #dee2e6',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            {products.map((product, index) => (
              <div key={index} style={{
                padding: '15px',
                borderBottom: index < products.length - 1 ? '1px solid #dee2e6' : 'none',
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{
                      margin: '0 0 5px 0',
                      color: '#495057',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      {product.name}
                    </h3>
                    {product.quantity && (
                      <p style={{
                        margin: '0',
                        color: '#6c757d',
                        fontSize: '14px'
                      }}>
                        Quantity: {product.quantity}
                      </p>
                    )}
                  </div>
                  <div style={{
                    color: '#28a745',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                    {formatAmount(product.price)} {currency}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          paddingTop: '20px',
          borderTop: '1px solid #e9ecef',
          color: '#6c757d',
          fontSize: '14px'
        }}>
          <p style={{ margin: '0 0 10px 0' }}>
            This is an automated notification about a new sale in your Okito payment system.
          </p>
          <p style={{ margin: '0' }}>
            Powered by <strong>Okito</strong> - Solana Payment Infrastructure
          </p>
        </div>
      </div>
    </div>
  );
};

// Export the HTML string version for email sending
export const getSaleTemplateHTML = (props: SaleTemplateProps): string => {
  // This would be used by the email service to render the template to HTML
  // For now, we'll create a simple HTML version
  const { 
    projectName, 
    customerWalletAddress, 
    amount, 
    currency, 
    transactionSignature, 
    products, 
    network, 
    confirmedAt 
  } = props;

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getNetworkDisplayName = (network: string) => {
    switch (network) {
      case 'mainnet-beta':
        return 'Solana Mainnet';
      case 'devnet':
        return 'Solana Devnet';
      default:
        return network;
    }
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Sale - ${projectName}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e9ecef;">
            <h1 style="color: #28a745; font-size: 28px; margin: 0 0 10px 0; font-weight: bold;">
              🎉 New Sale Received!
            </h1>
            <p style="color: #6c757d; font-size: 16px; margin: 0;">
              ${projectName}
            </p>
            <p style="color: #28a745; font-size: 14px; margin: 5px 0 0 0; font-weight: 500;">
              You've received a new payment!
            </p>
          </div>

          <!-- Sale Details -->
          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 25px;">
            <h2 style="color: #495057; font-size: 20px; margin: 0 0 15px 0; font-weight: 600;">
              Sale Details
            </h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">Amount:</strong>
              <span style="color: #28a745; font-size: 18px; font-weight: bold; margin-left: 10px;">
                ${formatAmount(amount)} ${currency}
              </span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">Customer Wallet:</strong>
              <span style="color: #007bff; font-family: monospace; margin-left: 10px; word-break: break-all;">
                ${customerWalletAddress}
              </span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">Network:</strong>
              <span style="color: #6c757d; margin-left: 10px;">
                ${getNetworkDisplayName(network)}
              </span>
            </div>

            <div style="margin-bottom: 15px;">
              <strong style="color: #495057;">Transaction:</strong>
              <span style="color: #007bff; font-family: monospace; margin-left: 10px; word-break: break-all;">
                ${transactionSignature}
              </span>
            </div>

            <div>
              <strong style="color: #495057;">Confirmed At:</strong>
              <span style="color: #6c757d; margin-left: 10px;">
                ${formatDate(confirmedAt)}
              </span>
            </div>
          </div>

          <!-- Products -->
          <div style="margin-bottom: 25px;">
            <h2 style="color: #495057; font-size: 20px; margin: 0 0 15px 0; font-weight: 600;">
              Products Purchased
            </h2>
            
            <div style="background-color: #ffffff; border: 1px solid #dee2e6; border-radius: 6px; overflow: hidden;">
              ${products.map((product, index) => `
                <div style="padding: 15px; border-bottom: ${index < products.length - 1 ? '1px solid #dee2e6' : 'none'}; background-color: ${index % 2 === 0 ? '#ffffff' : '#f8f9fa'};">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <h3 style="margin: 0 0 5px 0; color: #495057; font-size: 16px; font-weight: 600;">
                        ${product.name}
                      </h3>
                      ${product.quantity ? `<p style="margin: 0; color: #6c757d; font-size: 14px;">Quantity: ${product.quantity}</p>` : ''}
                    </div>
                    <div style="color: #28a745; font-size: 16px; font-weight: bold;">
                      ${formatAmount(product.price)} ${currency}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 14px;">
            <p style="margin: 0 0 10px 0;">
              This is an automated notification about a new sale in your Okito payment system.
            </p>
            <p style="margin: 0;">
              Powered by <strong>Okito</strong> - Solana Payment Infrastructure
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};
