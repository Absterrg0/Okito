import { describe, expect, test, beforeEach, jest, afterEach } from '@jest/globals';
import { PublicKey } from '@solana/web3.js';
import { 
    getTokenBalanceByMint, 
    getTokenBalanceBySymbol, 
} from '../../okito/token/get-balance-for-token';
import { 
    createTestConnection, 
    createTestWallet,
    TEST_CONFIG, 
    withTimeout,
    MockConnection,
    MockWallet
} from '../setup';

// Mock @solana/spl-token at the module level
jest.mock('@solana/spl-token', () => {
    const actual = jest.requireActual('@solana/spl-token') as any;
    return {
        ...actual,
        getMint: jest.fn()
    };
});

import { getMint } from '@solana/spl-token';
const mockGetMint = getMint as jest.MockedFunction<typeof getMint>;

describe('Token Balance Functions', () => {
    let connection: MockConnection;
    let wallet: MockWallet;

    beforeEach(() => {
        connection = createTestConnection();
        wallet = createTestWallet();
        process.env.NODE_ENV = 'test';
        
        // Reset the mock before each test
        mockGetMint.mockReset();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getTokenBalance', () => {
        test('should return token balance for valid wallet and mint', async () => {
            const result = await withTimeout(
                getTokenBalanceByMint(connection, wallet.publicKey, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance).toBeDefined();
            expect(result.balance?.amount).toBe(TEST_CONFIG.TEST_AMOUNT.toString());
            expect(result.balance?.decimals).toBe(6);
            expect(result.balance?.uiAmount).toBe(1);
            expect(result.balance?.uiAmountString).toBe('1');
            expect(result.error).toBeUndefined();
        });

        test('should handle wallet without public key', async () => {
            const invalidWallet = createTestWallet();
            // @ts-ignore - intentionally setting to null for test
            invalidWallet.publicKey = null;

            const result = await withTimeout(
                getTokenBalanceByMint(connection, invalidWallet.publicKey as any, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toBeDefined();
        });

        test('should handle non-existent token account', async () => {
            // Mock no account info (account doesn't exist)
            const noAccountConnection = createTestConnection();
            jest.spyOn(noAccountConnection, 'getAccountInfo').mockResolvedValue(null);
            
            // Mock getMint to return valid mint info for zero balance
            mockGetMint.mockResolvedValue({
                address: new PublicKey(TEST_CONFIG.USDC_MINT),
                decimals: 6,
                supply: BigInt(1000000),
                mintAuthority: null,
                freezeAuthority: null,
                isInitialized: true,
                tlvData: Buffer.alloc(0)
            });

            const result = await withTimeout(
                getTokenBalanceByMint(noAccountConnection, wallet.publicKey, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance?.amount).toBe('0');
            expect(result.balance?.decimals).toBe(6);
            expect(result.balance?.uiAmount).toBe(0);
            expect(result.balance?.uiAmountString).toBe('0');
        });

        test('should handle invalid mint address', async () => {
            const result = await withTimeout(
                getTokenBalanceByMint(connection, wallet.publicKey, 'invalid-mint')
            );

            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toBeDefined();
        });

        test('should handle connection errors', async () => {
            const errorConnection = createTestConnection();
            jest.spyOn(errorConnection, 'getAccountInfo').mockRejectedValue(
                new Error('Network error')
            );

            const result = await withTimeout(
                getTokenBalanceByMint(errorConnection, wallet.publicKey, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toContain('Network error');
        });

        test('should handle getTokenAccountBalance errors', async () => {
            const errorConnection = createTestConnection();
            jest.spyOn(errorConnection, 'getTokenAccountBalance').mockRejectedValue(
                new Error('Failed to get balance')
            );

            const result = await withTimeout(
                getTokenBalanceByMint(errorConnection, wallet.publicKey, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toContain('Failed to get balance');
        });
    });

    describe('getTokenBalanceBySymbol', () => {
        test('should return balance for USDC symbol', async () => {
            const result = await withTimeout(
                getTokenBalanceBySymbol(connection, wallet.publicKey, 'USDC', 'devnet')
            );

            expect(result.success).toBe(true);
            expect(result.balance).toBeDefined();
            expect(result.balance?.decimals).toBe(6);
        });

        test('should return balance for USDT symbol', async () => {
            const result = await withTimeout(
                getTokenBalanceBySymbol(connection, wallet.publicKey, 'USDT', 'devnet')
            );

            expect(result.success).toBe(true);
            expect(result.balance).toBeDefined();
        });

        test('should handle invalid token symbol', async () => {
            const result = await withTimeout(
                getTokenBalanceBySymbol(connection, wallet.publicKey, 'INVALID_TOKEN', 'devnet')
            );

            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toBeDefined();
        });

        test('should handle invalid network', async () => {
            // Force getMintAddress to throw as if invalid network was provided
            jest.resetModules();
            jest.doMock('../../okito/get-mint-address', () => ({
                getMintAddress: () => { throw new Error('Unsupported network: invalid-network. Supported: mainnet-beta, devnet'); }
            }));
            const { getTokenBalanceBySymbol: getTokenBalanceBySymbolReloaded }: { getTokenBalanceBySymbol: typeof getTokenBalanceBySymbol } = require('../../okito/token/get-balance-for-token');
            const result: Awaited<ReturnType<typeof getTokenBalanceBySymbol>> = await withTimeout(
                getTokenBalanceBySymbolReloaded(connection, wallet.publicKey, 'USDC', 'devnet')
            );
            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toBeDefined();
        });

        test('should handle getMintAddress import errors', async () => {
            jest.resetModules();
            jest.doMock('../../okito/get-mint-address', () => ({
                getMintAddress: () => { throw new Error('Mock import error'); }
            }));
            const { getTokenBalanceBySymbol: getTokenBalanceBySymbolReloaded }: { getTokenBalanceBySymbol: typeof getTokenBalanceBySymbol } = require('../../okito/token/get-balance-for-token');
            const result: Awaited<ReturnType<typeof getTokenBalanceBySymbol>> = await withTimeout(
                getTokenBalanceBySymbolReloaded(connection, wallet.publicKey, 'USDC', 'devnet')
            );
            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toBeDefined();
        });
    });



    describe('Edge Cases', () => {
        test('should handle different token decimals', async () => {
            // Mock token with 9 decimals
            const customConnection = createTestConnection();
            mockGetMint.mockResolvedValue({
                address: new PublicKey(TEST_CONFIG.USDC_MINT),
                decimals: 9,
                supply: BigInt(1000000000),
                mintAuthority: null,
                freezeAuthority: null,
                isInitialized: true,
                tlvData: Buffer.alloc(0)
            });

            jest.spyOn(customConnection, 'getAccountInfo').mockResolvedValue(null);

            const result = await withTimeout(
                getTokenBalanceByMint(customConnection, wallet.publicKey, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance?.decimals).toBe(9);
        });

        test('should handle very large balances', async () => {
            const largeBalanceConnection = createTestConnection();
            jest.spyOn(largeBalanceConnection, 'getTokenAccountBalance').mockResolvedValue({
                value: {
                    amount: '999999999999999999',
                    decimals: 6,
                    uiAmount: 999999999999.999999,
                    uiAmountString: '999999999999.999999'
                }
            });

            const result = await withTimeout(
                getTokenBalanceByMint(largeBalanceConnection, wallet.publicKey, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance?.amount).toBe('999999999999999999');
        });

        test('should handle zero balance', async () => {
            const zeroBalanceConnection = createTestConnection();
            jest.spyOn(zeroBalanceConnection, 'getTokenAccountBalance').mockResolvedValue({
                value: {
                    amount: '0',
                    decimals: 6,
                    uiAmount: 0,
                    uiAmountString: '0'
                }
            });

            const result = await withTimeout(
                getTokenBalanceByMint(zeroBalanceConnection, wallet.publicKey, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance?.amount).toBe('0');
            expect(result.balance?.uiAmount).toBe(0);
        });

        test('should handle fractional balances', async () => {
            const fractionalConnection = createTestConnection();
            jest.spyOn(fractionalConnection, 'getTokenAccountBalance').mockResolvedValue({
                value: {
                    amount: '123456',
                    decimals: 6,
                    uiAmount: 0.123456,
                    uiAmountString: '0.123456'
                }
            });

            const result = await withTimeout(
                getTokenBalanceByMint(fractionalConnection, wallet.publicKey, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance?.uiAmount).toBe(0.123456);
        });
    });

    describe('Performance', () => {
        test('should complete balance check within reasonable time', async () => {
            const startTime = Date.now();
            
            await withTimeout(
                getTokenBalanceByMint(connection, wallet.publicKey, TEST_CONFIG.USDC_MINT),
                5000
            );
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(5000);
        });

        test('should handle concurrent balance requests', async () => {
            const promises = Array.from({ length: 5 }, () =>
                getTokenBalanceByMint(connection, wallet.publicKey, TEST_CONFIG.USDC_MINT)
            );

            const results = await Promise.all(promises);

            results.forEach(result => {
                expect(result.success).toBe(true);
                expect(result.balance).toBeDefined();
            });
        });

        test('should handle multiple wallets concurrently', async () => {
            const wallets = Array.from({ length: 3 }, () => createTestWallet());
            
            const promises = wallets.map(w =>
                getTokenBalanceByMint(connection, w.publicKey, TEST_CONFIG.USDC_MINT)
            );

            const results = await Promise.all(promises);

            results.forEach(result => {
                expect(result.success).toBe(true);
                expect(result.balance).toBeDefined();
            });
        });
    });

    describe('Wallet Compatibility', () => {
        test('should work with different wallet implementations', async () => {
            // Test with multiple random wallets
            const wallet1 = createTestWallet();
            const wallet2 = createTestWallet();
            const wallet3 = createTestWallet();

            const results = await Promise.all([
                getTokenBalanceByMint(connection, wallet1.publicKey, TEST_CONFIG.USDC_MINT),
                getTokenBalanceByMint(connection, wallet2.publicKey, TEST_CONFIG.USDC_MINT),
                getTokenBalanceByMint(connection, wallet3.publicKey, TEST_CONFIG.USDC_MINT)
            ]);

            results.forEach(result => {
                expect(result.success).toBe(true);
                expect(result.balance).toBeDefined();
            });

            // Each wallet should have a different public key
            expect(wallet1.publicKey.toString()).not.toBe(wallet2.publicKey.toString());
            expect(wallet2.publicKey.toString()).not.toBe(wallet3.publicKey.toString());
            expect(wallet1.publicKey.toString()).not.toBe(wallet3.publicKey.toString());
        });

        test('should handle wallet connection state changes', async () => {
            const testWallet = createTestWallet();
            
            // Test connected state
            expect(testWallet.connected).toBe(true);
            
            const result = await withTimeout(
                getTokenBalanceByMint(connection, testWallet.publicKey, TEST_CONFIG.USDC_MINT)
            );
            
            expect(result.success).toBe(true);
        });
    });
}); 