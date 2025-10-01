export function formatDate(date: string | Date) {
    return new Date(date).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }
  
  export const getMetadataPreview = (metadata: Record<string, unknown>): string => {
    if (!metadata || Object.keys(metadata).length === 0) return '—'
    const metadataStr = JSON.stringify(metadata)
    return metadataStr.length > 30 ? `${metadataStr.slice(0, 30)}...` : metadataStr
  }
  
  export const formatAmount6Decimals = (value?: unknown): string => {
    if (value === undefined || value === null) return '—'
    try {
      const asBigInt = typeof value === 'bigint' ? value : BigInt(value as string)
      const DENOMINATOR = BigInt('1000000')
      const integerPart = asBigInt / DENOMINATOR
      const fractionalPart = asBigInt % DENOMINATOR
      const fractionalPadded = fractionalPart.toString().padStart(6, '0')
      const fractionalTrimmed = fractionalPadded.replace(/0+$/g, '')
      return fractionalTrimmed.length > 0
        ? `${integerPart.toString()}.${fractionalTrimmed}`
        : integerPart.toString()
    } catch {
      return String(value)
    }
  }
  
  export const getStatusClass = (status?: 'PENDING' | 'CONFIRMED' | 'FAILED') => {
    if (!status) return 'badge-secure'
    switch (status) {
      case 'CONFIRMED':
        return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
      case 'FAILED':
        return 'bg-red-500/10 text-red-500 border border-red-500/20'
      case 'PENDING':
      default:
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
    }
  }