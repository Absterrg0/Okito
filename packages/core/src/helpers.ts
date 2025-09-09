
export function createIdempotencyKey(): string {
    const anyCrypto: any = (typeof crypto !== 'undefined') ? crypto : undefined;
    if (anyCrypto && typeof anyCrypto.randomUUID === 'function') {
      return `okito_${anyCrypto.randomUUID()}`;
    }
    return `okito_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
  }

