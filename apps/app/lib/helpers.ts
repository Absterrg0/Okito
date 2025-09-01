import crypto from 'crypto'

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
  