import { Resend } from 'resend';
import { getSaleTemplateHTML, EmailTemplateType, EmailTemplateProps } from './email-templates';
import prisma from '@/db';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailNotificationOptions {
  projectId: string;
  templateType: EmailTemplateType;
  templateProps: EmailTemplateProps;
  customSubject?: string;
  customFromEmail?: string;
}

export interface ProjectEmailSettings {
  id: string;
  notificationEmails: string[];
  projectName: string;
  merchantEmail: string;
}

export class EmailService {
  private static instance: EmailService;
  private resend: Resend;

  private constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Get project email settings from database
   */
  private async getProjectEmailSettings(projectId: string): Promise<ProjectEmailSettings | null> {
    try {
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: {
          id: true,
          name: true,
          notificationEmails: true,
          user: {
            select: {
              email: true,
            }
          }
        }
      });

      if (!project) {
        return null;
      }

      return {
        id: project.id,
        notificationEmails: project.notificationEmails || [],
        projectName: project.name,
        merchantEmail: project.user.email,
      };
    } catch (error) {
      console.error('Error fetching project email settings:', error);
      return null;
    }
  }

  /**
   * Send email notification to all configured project emails
   */
  public async sendNotification(options: EmailNotificationOptions): Promise<{
    success: boolean;
    sentTo: string[];
    errors: Array<{ email: string; error: string }>;
  }> {
    const { projectId, templateType, templateProps, customSubject, customFromEmail } = options;

    try {
      // Get project email settings
      const projectSettings = await this.getProjectEmailSettings(projectId);
      
      if (!projectSettings) {
        throw new Error(`Project not found: ${projectId}`);
      }

      // Get list of emails to send to (notification emails + merchant email)
      const emailsToSend = [
        ...new Set([...projectSettings.notificationEmails, projectSettings.merchantEmail])
      ];

      if (emailsToSend.length === 0) {
        console.log(`No emails configured for project: ${projectId}`);
        return {
          success: true,
          sentTo: [],
          errors: []
        };
      }

      // Generate email content
      const htmlContent = this.generateEmailContent(templateType, templateProps);
      const subject = this.generateEmailSubject(templateType, templateProps, projectSettings.projectName, customSubject);

      // Prepare email sending
      const fromEmail = customFromEmail || process.env.DEFAULT_FROM_EMAIL || 'noreply@okito.dev';
      const fromName = 'Okito Payments';

      const sentTo: string[] = [];
      const errors: Array<{ email: string; error: string }> = [];

      // Send to each email (notification emails + merchant email)
      for (const email of emailsToSend) {
        try {
          const result = await this.resend.emails.send({
            from: `${fromName} <${fromEmail}>`,
            to: email,
            subject: subject,
            html: htmlContent,
          });

          if (result.error) {
            errors.push({ email, error: result.error.message || 'Unknown error' });
            console.error(`Failed to send email to ${email}:`, result.error);
          } else {
            sentTo.push(email);
            console.log(`Email sent successfully to ${email}, ID: ${result.data?.id}`);
          }
        } catch (error: any) {
          const errorMessage = error.message || 'Unknown error';
          errors.push({ email, error: errorMessage });
          console.error(`Error sending email to ${email}:`, error);
        }
      }

      const success = errors.length === 0 || sentTo.length > 0;

      return {
        success,
        sentTo,
        errors
      };

    } catch (error: any) {
      console.error('Email service error:', error);
      return {
        success: false,
        sentTo: [],
        errors: [{ email: 'all', error: error.message || 'Email service error' }]
      };
    }
  }

  /**
   * Generate email content based on template type
   */
  private generateEmailContent(templateType: EmailTemplateType, props: EmailTemplateProps): string {
    switch (templateType) {
      case EmailTemplateType.SALE_NOTIFICATION:
        return getSaleTemplateHTML(props);
      default:
        throw new Error(`Unknown email template type: ${templateType}`);
    }
  }

  /**
   * Generate email subject based on template type
   */
  private generateEmailSubject(
    templateType: EmailTemplateType, 
    props: EmailTemplateProps, 
    projectName: string,
    customSubject?: string
  ): string {
    if (customSubject) {
      return customSubject;
    }

    switch (templateType) {
      case EmailTemplateType.SALE_NOTIFICATION:
        return `🎉 New Sale: ${props.amount} ${props.currency} - ${projectName}`;
      default:
        return `Notification from ${projectName}`;
    }
  }

  /**
   * Test email sending to verify configuration
   */
  public async testEmail(projectId: string, testEmail: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const projectSettings = await this.getProjectEmailSettings(projectId);
      
      if (!projectSettings) {
        return { success: false, error: 'Project not found' };
      }

      const result = await this.resend.emails.send({
        from: `Okito Payments <${process.env.DEFAULT_FROM_EMAIL || 'noreply@okito.dev'}>`,
        to: testEmail,
        subject: `Test Email - ${projectSettings.projectName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #28a745;">✅ Email Test Successful!</h1>
            <p>This is a test email from your Okito payment system.</p>
            <p><strong>Project:</strong> ${projectSettings.projectName}</p>
            <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
            <hr>
            <p style="color: #6c757d; font-size: 14px;">
              If you received this email, your email notifications are working correctly!
            </p>
          </div>
        `,
      });

      if (result.error) {
        return { success: false, error: result.error.message };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance();
