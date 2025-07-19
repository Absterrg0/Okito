import { Connection, PublicKey, Keypair, Transaction, VersionedTransaction } from '@solana/web3.js';
import { SignerWallet } from '../types/custom-wallet-adapter';
import { OkitoToken } from '../types/config';

// Test configuration
export const TEST_CONFIG = {
    RPC_URL: 'https://api.devnet.solana.com',
    NETWORK: 'devnet' as 'mainnet-beta' | 'devnet' | 'custom',
    USDC_MINT: 'BXXkv6zRCpzzB4K8GzJJwRGCqkAs7u3fTqYWMvYMgPqa', // Devnet USDC (matches get-mint-address.ts)
    USDT_MINT: 'C8dV1ujnpVaUYZBLsD1fGkx9pVnUo4LxGC7hB9NRWnfa', // Devnet USDT (matches get-mint-address.ts)
    SOL_MINT: 'So11111111111111111111111111111111111111112', // Wrapped SOL
    TEST_AMOUNT: 1000000, // 1 token with 6 decimals
    TIMEOUT: 30000
};

// Mock wallet implementation
export class MockWallet implements SignerWallet {
    public publicKey: PublicKey;
    private keypair: Keypair;

    constructor(keypair?: Keypair) {
        this.keypair = keypair || Keypair.generate();
        this.publicKey = this.keypair.publicKey;
    }

    async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
        if (transaction instanceof VersionedTransaction) {
            transaction.sign([this.keypair]);
        } else {
        transaction.partialSign(this.keypair);
        }
        return transaction;
    }

    async signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> {
        return transactions.map(tx => {
            if (tx instanceof VersionedTransaction) {
                tx.sign([this.keypair]);
            } else {
            tx.partialSign(this.keypair);
            }
            return tx;
        });
    }


    sendTransaction(
        transaction: Transaction,
        connection: Connection
    ): Promise<string> {
        return this.signTransaction(transaction).then(tx => {
            return connection.sendRawTransaction(tx.serialize());
        });
    }

    async signMessage(message: Uint8Array): Promise<Uint8Array> {
        // Mock implementation - in real use case this would sign the message
        return new Uint8Array(64); // Mock signature
    }

    connect(): Promise<void> {
        return Promise.resolve();
    }

    disconnect(): Promise<void> {
        return Promise.resolve();
    }

    get connected(): boolean {
        return true;
    }
}

// Mock connection with common responses
export class MockConnection extends Connection {
    private mockResponses: Map<string, any> = new Map();

    constructor(endpoint: string = TEST_CONFIG.RPC_URL) {
        super(endpoint, 'confirmed');
        this.setupMockResponses();
    }

    private setupMockResponses() {
        // Mock token account balance
        this.mockResponses.set('getTokenAccountBalance', {
            value: {
                amount: TEST_CONFIG.TEST_AMOUNT.toString(),
                decimals: 6,
                uiAmount: 1,
                uiAmountString: '1'
            }
        });

                 // Mock mint account info - this is what getMint() uses
         const mintAccountData = Buffer.alloc(82); // SPL Token mint account size
         // Write mint account layout data
         mintAccountData.writeUInt32LE(1, 0); // mintAuthorityOption (COption<Pubkey>)
         new PublicKey('BXXkv6zRCpzzB4K8GzJJwRGCqkAs7u3fTqYWMvYMgPqa').toBuffer().copy(mintAccountData, 4); // mintAuthority
        mintAccountData.writeBigUInt64LE(BigInt('1000000000000'), 36); // supply
        mintAccountData.writeUInt8(6, 44); // decimals
        mintAccountData.writeUInt8(1, 45); // isInitialized
                 mintAccountData.writeUInt32LE(1, 46); // freezeAuthorityOption
         new PublicKey('BXXkv6zRCpzzB4K8GzJJwRGCqkAs7u3fTqYWMvYMgPqa').toBuffer().copy(mintAccountData, 50); // freezeAuthority

        this.mockResponses.set('getMintAccountInfo', {
            owner: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), // SPL Token program
            lamports: 1461600,
            data: mintAccountData,
            executable: false,
            rentEpoch: 361
        });

        // Mock regular account info (for token accounts)
        this.mockResponses.set('getAccountInfo', {
            owner: new PublicKey(TEST_CONFIG.USDC_MINT),
            lamports: 2039280,
            data: Buffer.alloc(165), // Mock token account data
            executable: false,
            rentEpoch: 361
        });

        // Mock token supply
        this.mockResponses.set('getTokenSupply', {
            value: {
                amount: '1000000000000',
                decimals: 6,
                uiAmount: 1000000,
                uiAmountString: '1000000'
            }
        });

        // Mock signatures
        this.mockResponses.set('getSignaturesForAddress', [
            {
                signature: '5VERv8NMvzbJMEkV8xnrLkEaWRtSz9CosKDYjCJjBRnbJLgp8uirBgmQpjKhoR4tjF3ZpRzrFmBV6UjKdiSZkQUW',
                slot: 114,
                err: null,
                memo: null,
                blockTime: 1639926816
            }
        ]);

        // Mock parsed transactions
        this.mockResponses.set('getParsedTransactions', [
            {
                slot: 114,
                transaction: {
                    message: {
                        instructions: [],
                        accountKeys: []
                    },
                    signatures: ['5VERv8NMvzbJMEkV8xnrLkEaWRtSz9CosKDYjCJjBRnbJLgp8uirBgmQpjKhoR4tjF3ZpRzrFmBV6UjKdiSZkQUW']
                },
                meta: {
                    err: null,
                    fee: 5000,
                    preBalances: [1000000],
                    postBalances: [995000]
                }
            }
        ]);
    }

    // Override methods to return mock data in test environment
    async getTokenAccountBalance(pubkey: PublicKey) {
        if (process.env.NODE_ENV === 'test') {
            return this.mockResponses.get('getTokenAccountBalance');
        }
        return super.getTokenAccountBalance(pubkey);
    }

    async getAccountInfo(pubkey: PublicKey) {
        if (process.env.NODE_ENV === 'test') {
            // Check if this is a mint address (for getMint calls)
            const mintAddresses = [TEST_CONFIG.USDC_MINT, TEST_CONFIG.USDT_MINT, TEST_CONFIG.SOL_MINT];
            if (mintAddresses.includes(pubkey.toString())) {
                return this.mockResponses.get('getMintAccountInfo');
            }
            return this.mockResponses.get('getAccountInfo');
        }
        return super.getAccountInfo(pubkey);
    }

    async getTokenSupply(pubkey: PublicKey) {
        if (process.env.NODE_ENV === 'test') {
            return this.mockResponses.get('getTokenSupply');
        }
        return super.getTokenSupply(pubkey);
    }

    async getSignaturesForAddress(pubkey: PublicKey, options?: any) {
        if (process.env.NODE_ENV === 'test') {
            return this.mockResponses.get('getSignaturesForAddress');
        }
        return super.getSignaturesForAddress(pubkey, options);
    }

    async getParsedTransactions(signatures: string[], options?: any) {
        if (process.env.NODE_ENV === 'test') {
            return this.mockResponses.get('getParsedTransactions');
        }
        return super.getParsedTransactions(signatures, options);
    }
}

// Test utilities
export const createTestWallet = (): MockWallet => {
    return new MockWallet();
};

export const createTestConnection = (): MockConnection => {
    return new MockConnection();
};

export const createTestKeypair = (): Keypair => {
    return Keypair.generate();
};

// Mock configuration for tests
export const createTestConfig = () => ({
    network: TEST_CONFIG.NETWORK,
    rpcUrl: TEST_CONFIG.RPC_URL,
    publicKey: createTestKeypair().publicKey,
    tokens: ['USDC', 'USDT'] as [OkitoToken, OkitoToken]
});

// Async test wrapper for timeout handling
export const withTimeout = async <T>(
    promise: Promise<T>, 
    timeoutMs: number = TEST_CONFIG.TIMEOUT
): Promise<T> => {
    const timeout = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Test timeout')), timeoutMs);
    });
    
    return Promise.race([promise, timeout]);
};

// Mock successful transaction response
export const mockTransactionSuccess = {
    success: true,
    transactionId: '5VERv8NMvzbJMEkV8xnrLkEaWRtSz9CosKDYjCJjBRnbJLgp8uirBgmQpjKhoR4tjF3ZpRzrFmBV6UjKdiSZkQUW',
    error: undefined
};

// Mock error response  
export const mockTransactionError = {
    success: false,
    transactionId: undefined,
    error: 'Mock transaction failed'
}; 