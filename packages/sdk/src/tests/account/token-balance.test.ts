import { describe, expect, test, beforeEach, jest, afterEach } from '@jest/globals';
import { PublicKey } from '@solana/web3.js';
import { 
    getTokenBalance, 
    getTokenBalanceBySymbol, 
    getBalanceForTokenSafe 
} from '../../okito/account/get-balance-for-token';
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
                getTokenBalance(connection, wallet, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance).toBeDefined();
            expect(result.balance?.value?.amount).toBe(TEST_CONFIG.TEST_AMOUNT.toString());
            expect(result.balance?.value?.decimals).toBe(6);
            expect(result.balance?.value?.uiAmount).toBe(1);
            expect(result.balance?.value?.uiAmountString).toBe('1');
            expect(result.error).toBeUndefined();
        });

        test('should handle wallet without public key', async () => {
            const invalidWallet = createTestWallet();
            // @ts-ignore - intentionally setting to null for test
            invalidWallet.publicKey = null;

            const result = await withTimeout(
                getTokenBalance(connection, invalidWallet, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toBe('Wallet not connected');
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
                getTokenBalance(noAccountConnection, wallet, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance?.value?.amount).toBe('0');
            expect(result.balance?.value?.decimals).toBe(6);
            expect(result.balance?.value?.uiAmount).toBe(0);
            expect(result.balance?.value?.uiAmountString).toBe('0');
        });

        test('should handle invalid mint address', async () => {
            const result = await withTimeout(
                getTokenBalance(connection, wallet, 'invalid-mint')
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
                getTokenBalance(errorConnection, wallet, TEST_CONFIG.USDC_MINT)
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
                getTokenBalance(errorConnection, wallet, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toContain('Failed to get balance');
        });
    });

    describe('getTokenBalanceBySymbol', () => {
        test('should return balance for USDC symbol', async () => {
            const result = await withTimeout(
                getTokenBalanceBySymbol(connection, wallet, 'USDC', TEST_CONFIG.NETWORK)
            );

            expect(result.success).toBe(true);
            expect(result.balance).toBeDefined();
            expect(result.balance?.value?.decimals).toBe(6);
        });

        test('should return balance for USDT symbol', async () => {
            const result = await withTimeout(
                getTokenBalanceBySymbol(connection, wallet, 'USDT', TEST_CONFIG.NETWORK)
            );

            expect(result.success).toBe(true);
            expect(result.balance).toBeDefined();
        });

        test('should handle invalid token symbol', async () => {
            const result = await withTimeout(
                getTokenBalanceBySymbol(connection, wallet, 'INVALID_TOKEN', TEST_CONFIG.NETWORK)
            );

            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toBeDefined();
        });

        test('should handle invalid network', async () => {
            const result = await withTimeout(
                getTokenBalanceBySymbol(connection, wallet, 'USDC', 'invalid-network')
            );

            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toBeDefined();
        });

        test('should handle getMintAddress import errors', async () => {
            const result = await withTimeout(
                getTokenBalanceBySymbol(connection, wallet, 'USDC', '')
            );

            expect(result.success).toBe(false);
            expect(result.balance).toBeNull();
            expect(result.error).toBeDefined();
        });
    });

    describe('getBalanceForTokenSafe (Legacy)', () => {
        test('should work as alias for getTokenBalanceBySymbol', async () => {
            const result = await withTimeout(
                getBalanceForTokenSafe(connection, wallet, 'USDC', TEST_CONFIG.NETWORK)
            );

            expect(result.success).toBe(true);
            expect(result.balance).toBeDefined();
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
                getTokenBalance(customConnection, wallet, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance?.value?.decimals).toBe(9);
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
                getTokenBalance(largeBalanceConnection, wallet, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance?.value?.amount).toBe('999999999999999999');
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
                getTokenBalance(zeroBalanceConnection, wallet, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance?.value?.amount).toBe('0');
            expect(result.balance?.value?.uiAmount).toBe(0);
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
                getTokenBalance(fractionalConnection, wallet, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance?.value?.uiAmount).toBe(0.123456);
        });
    });

    describe('Performance', () => {
        test('should complete balance check within reasonable time', async () => {
            const startTime = Date.now();
            
            await withTimeout(
                getTokenBalance(connection, wallet, TEST_CONFIG.USDC_MINT),
                5000
            );
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(5000);
        });

        test('should handle concurrent balance requests', async () => {
            const promises = Array.from({ length: 5 }, () =>
                getTokenBalance(connection, wallet, TEST_CONFIG.USDC_MINT)
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
                getTokenBalance(connection, w, TEST_CONFIG.USDC_MINT)
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
                getTokenBalance(connection, wallet1, TEST_CONFIG.USDC_MINT),
                getTokenBalance(connection, wallet2, TEST_CONFIG.USDC_MINT),
                getTokenBalance(connection, wallet3, TEST_CONFIG.USDC_MINT)
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
                getTokenBalance(connection, testWallet, TEST_CONFIG.USDC_MINT)
            );
            
            expect(result.success).toBe(true);
        });
    });
}); 