export { SaleTemplate, getSaleTemplateHTML } from './SaleTemplate';
import { getSaleTemplateHTML } from './SaleTemplate';
// Template types
export interface EmailTemplateProps {
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

// Template types enum
export enum EmailTemplateType {
  SALE_NOTIFICATION = 'sale_notification',
  PAYMENT_FAILED = 'payment_failed',
  PAYMENT_PENDING = 'payment_pending',
  // Add more template types as needed
}

// Template factory function
export const getEmailTemplate = (type: EmailTemplateType, props: EmailTemplateProps) => {
  switch (type) {
    case EmailTemplateType.SALE_NOTIFICATION:
      return getSaleTemplateHTML(props);
    default:
      throw new Error(`Unknown email template type: ${type}`);
  }
};
