import crypto from 'crypto'
import { sealData, unsealData } from 'iron-session';
import { toast } from 'sonner';

export const generateRandomName = () => {
    const adjectives = ['Swift', 'Bright', 'Dynamic', 'Elite', 'Prime', 'Core', 'Peak', 'Zen', 'Nova', 'Pulse']
    const nouns = ['App', 'Hub', 'Studio', 'Lab', 'Works', 'Space', 'Zone', 'Base', 'Center', 'Platform']
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    return `${adj} ${noun}`
  }
  

  // Helper function to generate secure API tokens
export function generateApiToken(environment: 'TEST' | 'LIVE'): string {
    const prefix = environment === 'TEST' ? 'pk_test_' : 'pk_live_'
    const randomBytes = crypto.randomBytes(32).toString('hex')
    return prefix + randomBytes
  }
  
  // Helper function to hash tokens for storage
export  function hashValue(value: string): string {
    return crypto.createHash('sha256').update(value).digest('hex')
  }
  



  export function generateWebhookSecret(): string {
    return `whsec_${crypto.randomBytes(32).toString('hex')}`;
  }



function getWebhookPassword(): string {
  const pwd = process.env.WEBHOOK_PASSWORD;
  if (!pwd || pwd.length < 32) {
    throw new Error('Missing or insecure WEBHOOK_PASSWORD. It must be at least 32 characters long.');
  }
  return pwd;
}

export async function encryptData(data: string | object): Promise<string> {
  return sealData(data, {
    password: getWebhookPassword(),
    ttl: 0, // 0 means the data never expires
  });
}

export async function decryptData<T>(sealedData: string): Promise<T> {
  return unsealData(sealedData, {
    password: getWebhookPassword(),
    ttl: 0,
  });
}

export const copyToClipboard = async (text: string, label: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  } catch (error) {
    toast.error('Failed to copy to clipboard')
  }
}



export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
