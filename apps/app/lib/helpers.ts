import crypto from 'crypto'
import { sealData, unsealData } from 'iron-session';

export const generateRandomName = () => {
    const adjectives = ['Swift', 'Bright', 'Dynamic', 'Elite', 'Prime', 'Core', 'Peak', 'Zen', 'Nova', 'Pulse']
    const nouns = ['App', 'Hub', 'Studio', 'Lab', 'Works', 'Space', 'Zone', 'Base', 'Center', 'Platform']
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    return `${adj} ${noun}`
  }
  

  // Helper function to generate secure API tokens
export function generateApiToken(environment: 'DEVELOPMENT' | 'PRODUCTION'): string {
    const prefix = environment === 'DEVELOPMENT' ? 'pk_test_' : 'pk_live_'
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



const password = process.env.WEBHOOK_PASSWORD!;

if (!password || password.length <  32) {
  throw new Error('Missing or insecure SECRET_COOKIE_PASSWORD. It must be at least 32 characters long.');
}
export async function encryptData(data: string | object): Promise<string> {
  return sealData(data, {
    password,
    ttl: 0, // 0 means the data never expires
  });
}

export async function decryptData<T>(sealedData: string): Promise<T> {
  return unsealData(sealedData, {
    password,
    ttl: 0,
  });
}