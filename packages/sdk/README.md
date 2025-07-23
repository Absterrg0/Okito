# Okito SDK

A comprehensive TypeScript SDK for Solana blockchain interactions, focusing on token operations, payments, and DeFi functionality.

[![npm version](https://badge.fury.io/js/%40okito%2Fsdk.svg)](https://badge.fury.io/js/%40okito%2Fsdk)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)

## Features

🚀 **Token Operations**
- Create new tokens with metadata
- Transfer tokens between accounts  
- Burn tokens
- Get token supply and balance information

💰 **Payment Solutions**
- Simple payment processing
- Multi-token support
- Fee estimation

🎁 **Airdrop Functionality**
- Batch token distribution
- Multiple recipient support
- Configurable batch sizes

🏦 **Account Management**
- Token balance queries
- Transaction history
- Account information retrieval

🎨 **NFT Operations**
- Create individual NFTs
- Batch NFT creation
- Metadata management

🔄 **SOL Operations**
- Wrap/unwrap SOL
- Fee estimation

## Installation

```bash
npm install @okito/sdk
```

```bash
yarn add @okito/sdk
```

```bash
pnpm add @okito/sdk
```

## Quick Start

### Option 1: Class-Based API (Recommended)

```typescript
import { Okito } from '@okito/sdk';

// Create Okito instance
const okito = new Okito({
  network: 'devnet',
  publicKey: 'YOUR_MERCHANT_PUBLIC_KEY',
  tokens: ['USDC', 'USDT']
}, wallet);

// Use organized namespaces
const supply = await okito.tokens.getSupply('EPjFWdd5AufqSSqeM2qN1xzy3dKTtWHv5aC88jydDxAz');
const balance = await okito.account.getBalance('EPjFWdd5AufqSSqeM2qN1xzy3dKTtWHv5aC88jydDxAz');
await okito.payments.pay(10.5, 'USDC');
```

### Option 2: Functional API

```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { 
  getTokenSupplyByMint, 
  getTokenBalanceByMint, 
  transferTokens,
  pay 
} from '@okito/sdk';

// Create connection
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Get token supply
const supply = await getTokenSupplyByMint(
  connection, 
  'EPjFWdd5AufqSSqeM2qN1xzy3dKTtWHv5aC88jydDxAz' // USDC
);

console.log('USDC Total Supply:', supply.supply?.uiAmount);
```

## Core APIs

### Class-Based API (Okito Instance)

The Okito class provides a clean, organized interface where you initialize once and use everywhere:

```typescript
import { Okito } from '@okito/sdk';

const okito = new Okito(config, wallet);
```

#### Account Operations

```typescript
// Get token balance
const balance = await okito.account.getBalance(mintAddress);
const usdcBalance = await okito.account.getBalanceBySymbol('USDC', 'mainnet-beta');

// Get transaction history
const history = await okito.account.getTransactionHistory({ limit: 50 });
const recent = await okito.account.get20Transactions();
```

#### Token Operations

```typescript
// Get token supply
const supply = await okito.tokens.getSupply(mintAddress);
const usdcSupply = await okito.tokens.getSupplyBySymbol('USDC', 'mainnet-beta');

// Transfer tokens
const transferResult = await okito.tokens.transfer({
  mint: mintAddress,
  destination: recipientAddress,
  amount: BigInt(1000000),
  config: { enableLogging: true }
});

// Burn tokens
const burnResult = await okito.tokens.burn({
  mintAddress: mintAddress,
  amount: BigInt(500000),
  config: { enableLogging: true }
});

// Create new token
const tokenResult = await okito.tokens.create(tokenData, config);
```

#### Payment Operations

```typescript
// Simple payments
const txId = await okito.payments.pay(25.99, 'USDC');
```

#### Airdrop Operations

```typescript
// Multiple recipients
const airdropResult = await okito.airdrop.toMultiple(mintAddress, recipients);

// Single recipient
const singleResult = await okito.airdrop.toAddress(mintAddress, recipientAddress, amount);

// Batch operations
const batchResult = await okito.airdrop.batch(mintAddress, recipients, config);
```

#### NFT Operations

```typescript
// Create single NFT
const nft = await okito.nft.create(nftData);

// Create multiple NFTs
const nftBatch = await okito.nft.createBatch([nftData1, nftData2, nftData3]);
```

#### SOL Operations

```typescript
// Wrap SOL
const wrapResult = await okito.sol.wrap({ amount: BigInt(1000000000) });
```

#### Utility Methods

```typescript
// Access underlying instances
const connection = okito.getConnection();
const wallet = okito.getWallet();
const config = okito.getConfig();

// Update wallet (useful for wallet switching)
okito.updateWallet(newWallet);

// Update connection (useful for network switching)  
okito.updateConnection(newConnection);
```

### Functional API

For those who prefer function-based usage:

### Token Operations

#### Get Token Supply

```typescript
import { getTokenSupplyByMint, getTokenSupplyBySymbol } from '@okito/sdk';

// By mint address
const supply = await getTokenSupplyByMint(connection, mintAddress);

// By symbol
const usdcSupply = await getTokenSupplyBySymbol(connection, 'USDC', 'mainnet-beta');
```

#### Get Token Balance

```typescript
import { getTokenBalanceByMint, getTokenBalanceBySymbol } from '@okito/sdk';

// By mint address
const balance = await getTokenBalanceByMint(connection, wallet, mintAddress);

// By symbol  
const usdcBalance = await getTokenBalanceBySymbol(connection, wallet, 'USDC', 'mainnet-beta');
```

#### Transfer Tokens

```typescript
import { transferTokens } from '@okito/sdk';

const result = await transferTokens({
  connection,
  wallet,
  mint: 'EPjFWdd5AufqSSqeM2qN1xzy3dKTtWHv5aC88jydDxAz',
  destination: 'RECIPIENT_ADDRESS',
  amount: BigInt(1000000), // 1 USDC (6 decimals)
  config: {
    enableLogging: true,
    priorityFee: 1000
  }
});
```

#### Burn Tokens

```typescript
import { burnToken } from '@okito/sdk';

const result = await burnToken({
  connection,
  wallet,
  mintAddress: 'TOKEN_MINT_ADDRESS',
  amount: BigInt(500000), // 0.5 tokens
  config: {
    enableLogging: true
  }
});
```

### Token Creation

```typescript
import { createNewToken } from '@okito/sdk';

const tokenData = {
  name: 'My Token',
  symbol: 'MTK',
  decimals: 6,
  initialSupply: BigInt(1000000 * 1e6), // 1M tokens
  description: 'My custom token',
  imageUrl: 'https://example.com/token-image.png',
  freezeAuthority: true
};

const result = await createNewToken(wallet, connection, tokenData, {
  enableLogging: true,
  priorityFee: 5000
});
```

### Payment Processing

```typescript
import { pay } from '@okito/sdk';

// Pay with crypto
const transactionId = await pay(
  connection,
  wallet,
  10.5,        // amount
  'USDC',      // token
  {
    publicKey: merchantPublicKey,
    network: 'mainnet-beta',
    tokens: ['USDC', 'USDT']
  }
);
```

### Airdrop Operations

```typescript
import { airdropTokensToMultiple } from '@okito/sdk';

const recipients = [
  { address: 'ADDRESS_1', amount: BigInt(1000000) },
  { address: 'ADDRESS_2', amount: BigInt(2000000) },
  // ... more recipients
];

const result = await airdropTokensToMultiple(
  connection,
  wallet,
  'TOKEN_MINT_ADDRESS',
  recipients,
  {
    enableLogging: true,
    batchSize: 10
  }
);
```

### Account Information

```typescript
import { getTransactionHistory } from '@okito/sdk';

// Get transaction history
const history = await getTransactionHistory(connection, wallet, {
  limit: 50,
  before: 'TRANSACTION_SIGNATURE'
});

// Simple transaction history
const simpleHistory = await getSimpleTransactionHistory(connection, wallet);
```

### NFT Operations

```typescript
import { createNFT, createNFTBatch } from '@okito/sdk';

// Create single NFT
const nftData = {
  name: 'My NFT',
  symbol: 'MNFT',
  description: 'My first NFT',
  imageUrl: 'https://example.com/nft.png',
  attributes: [
    { trait_type: 'Color', value: 'Blue' },
    { trait_type: 'Rarity', value: 'Rare' }
  ]
};

const nft = await createNFT(connection, wallet, nftData);

// Batch create NFTs
const nftDataArray = [nftData1, nftData2, nftData3];
const batchResult = await createNFTBatch(connection, wallet, nftDataArray);
```

### SOL Operations

```typescript
import { wrapSol } from '@okito/sdk';

// Wrap SOL to wSOL
const result = await wrapSol({
  connection,
  wallet,
  amount: BigInt(1000000000), // 1 SOL
  config: {
    enableLogging: true
  }
});
```

## Configuration

### Network Configuration

The SDK supports different Solana networks:

```typescript
type OkitoNetwork = 'mainnet-beta' | 'devnet' | 'custom';

const config = {
  network: 'mainnet-beta' as OkitoNetwork,
  rpcUrl: 'https://api.mainnet-beta.solana.com',
  publicKey: merchantPublicKey,
  tokens: ['USDC', 'USDT'] as [OkitoToken, OkitoToken]
};
```

### Supported Tokens

- **USDC**: USD Coin
- **USDT**: Tether USD  
- **SOL**: Native Solana token (wrapped)

More tokens can be added via the mint address configuration.

## Error Handling

All SDK functions return structured error responses:

```typescript
interface OperationResult {
  success: boolean;
  error?: string;
  // ... other result data
}

const result = await getTokenSupplyByMint(connection, mintAddress);

if (!result.success) {
  console.error('Operation failed:', result.error);
  return;
}

// Use result.data
console.log('Supply:', result.supply?.uiAmount);
```

## Fee Estimation

Estimate fees before executing operations:

```typescript
import { 
  estimateTokenCreationFee, 
  estimateTransferFee,
  estimateAirdropFee 
} from '@okito/sdk';

// Token creation fees
const creationFees = await estimateTokenCreationFee(connection, tokenData);

// Transfer fees  
const transferFees = await estimateTransferFee(connection, {
  mint: mintAddress,
  amount: BigInt(1000000)
});

// Airdrop fees
const airdropFees = await estimateAirdropFee(connection, recipients);
```

## Testing

The SDK includes comprehensive test suites:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run integration tests
npm run test:integration

# Run unit tests only
npm run test:unit

# Watch mode
npm run test:watch
```

## Development

```bash
# Build the package
npm run build

# Watch mode for development
npm run build:watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Clean build artifacts
npm run clean
```

## TypeScript Support

The SDK is written in TypeScript and includes full type definitions:

```typescript
import { Okito } from '@okito/sdk';
import type { 
  OkitoConfig,
  SignerWallet,
  TransferResult,
  AirdropResult,
  TokenLaunchResult
} from '@okito/sdk';

// Full type support for the Okito class
const okito: Okito = new Okito(config, wallet);
```

## Requirements

- Node.js >= 16.0.0
- TypeScript >= 4.5.0 (for development)
- Solana/Web3.js >= 1.98.0

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

Support links coming soon.
---

Built with ❤️ for the Solana ecosystem 