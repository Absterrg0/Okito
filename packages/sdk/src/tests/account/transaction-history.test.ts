import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { 
    getTransactionHistory, 
    get20Transactions, 
} from '../../okito/account/get-transaction-history';
import { 
    createTestConnection, 
    createTestWallet,
    withTimeout,
    MockConnection,
    MockWallet
} from '../setup';

describe('Transaction History Functions', () => {
    let connection: MockConnection;
    let wallet: MockWallet;

    beforeEach(() => {
        connection = createTestConnection();
        wallet = createTestWallet();
        process.env.NODE_ENV = 'test';
    });

    describe('getTransactionHistory', () => {
        test('should return transaction history for valid wallet', async () => {
            const result = await withTimeout(
                getTransactionHistory(connection, wallet)
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toBeDefined();
            expect(Array.isArray(result.transactions)).toBe(true);
            expect(result.signatures).toBeDefined();
            expect(Array.isArray(result.signatures)).toBe(true);
            expect(result.hasMore).toBeDefined();
            expect(typeof result.hasMore).toBe('boolean');
            expect(result.error).toBeUndefined();
        });

        test('should handle wallet without public key', async () => {
            const invalidWallet = createTestWallet();
            // @ts-ignore - intentionally setting to null for test
            invalidWallet.publicKey = null;

            const result = await withTimeout(
                getTransactionHistory(connection, invalidWallet)
            );

            expect(result.success).toBe(false);
            expect(result.transactions).toBeNull();
            expect(result.error).toBe('Wallet not connected');
        });

        test('should handle custom limit options', async () => {
            const options = { limit: 10 };
            
            const result = await withTimeout(
                getTransactionHistory(connection, wallet, options)
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toBeDefined();
        });

        test('should handle pagination with before parameter', async () => {
            const options = { 
                limit: 5,
                before: '5VERv8NMvzbJMEkV8xnrLkEaWRtSz9CosKDYjCJjBRnbJLgp8uirBgmQpjKhoR4tjF3ZpRzrFmBV6UjKdiSZkQUW'
            };
            
            const result = await withTimeout(
                getTransactionHistory(connection, wallet, options)
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toBeDefined();
        });

        test('should handle pagination with until parameter', async () => {
            const options = { 
                limit: 5,
                until: '5VERv8NMvzbJMEkV8xnrLkEaWRtSz9CosKDYjCJjBRnbJLgp8uirBgmQpjKhoR4tjF3ZpRzrFmBV6UjKdiSZkQUW'
            };
            
            const result = await withTimeout(
                getTransactionHistory(connection, wallet, options)
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toBeDefined();
        });

        test('should handle different commitment levels', async () => {
            const options = { commitment: 'finalized' as const };
            
            const result = await withTimeout(
                getTransactionHistory(connection, wallet, options)
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toBeDefined();
        });

        test('should validate limit parameter', async () => {
            const invalidOptions = { limit: 0 };
            
            const result = await withTimeout(
                getTransactionHistory(connection, wallet, invalidOptions)
            );

            expect(result.success).toBe(false);
            expect(result.transactions).toBeNull();
            expect(result.error).toBe('Limit must be between 1 and 1000');
        });

        test('should validate maximum limit', async () => {
            const invalidOptions = { limit: 1001 };
            
            const result = await withTimeout(
                getTransactionHistory(connection, wallet, invalidOptions)
            );

            expect(result.success).toBe(false);
            expect(result.transactions).toBeNull();
            expect(result.error).toBe('Limit must be between 1 and 1000');
        });

        test('should handle no transactions found', async () => {
            const emptyConnection = createTestConnection();
            jest.spyOn(emptyConnection, 'getSignaturesForAddress').mockResolvedValue([]);

            const result = await withTimeout(
                getTransactionHistory(emptyConnection, wallet)
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toEqual([]);
            expect(result.signatures).toEqual([]);
            expect(result.hasMore).toBe(false);
        });

        test('should handle connection errors', async () => {
            const errorConnection = createTestConnection();
            jest.spyOn(errorConnection, 'getSignaturesForAddress').mockRejectedValue(
                new Error('Network error')
            );

            const result = await withTimeout(
                getTransactionHistory(errorConnection, wallet)
            );

            expect(result.success).toBe(false);
            expect(result.transactions).toBeNull();
            expect(result.error).toContain('Network error');
        });

        test('should handle rate limiting errors', async () => {
            const rateLimitConnection = createTestConnection();
            jest.spyOn(rateLimitConnection, 'getSignaturesForAddress').mockRejectedValue(
                new Error('429 rate limit exceeded')
            );

            const result = await withTimeout(
                getTransactionHistory(rateLimitConnection, wallet)
            );

            expect(result.success).toBe(false);
            expect(result.transactions).toBeNull();
            expect(result.error).toBe('Rate limited. Please try again later.');
        });

        test('should handle timeout errors', async () => {
            const timeoutConnection = createTestConnection();
            jest.spyOn(timeoutConnection, 'getSignaturesForAddress').mockRejectedValue(
                new Error('Request timeout')
            );

            const result = await withTimeout(
                getTransactionHistory(timeoutConnection, wallet)
            );

            expect(result.success).toBe(false);
            expect(result.transactions).toBeNull();
            expect(result.error).toBe('Request timeout. Network may be slow.');
        });

        test('should handle failed transaction parsing', async () => {
            const failedParseConnection = createTestConnection();
            jest.spyOn(failedParseConnection, 'getParsedTransactions').mockResolvedValue([null]);

            const result = await withTimeout(
                getTransactionHistory(failedParseConnection, wallet)
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toBeDefined();
            expect(result.transactions?.length).toBe(0); // Nulls filtered out
        });

        test('should detect hasMore correctly', async () => {
            // Mock more signatures than limit
            const moreSignaturesConnection = createTestConnection();
            const mockSignatures = Array.from({ length: 21 }, (_, i) => ({
                signature: `sig${i}`,
                slot: 100 + i,
                err: null,
                memo: null,
                blockTime: 1639926816 + i
            }));
            jest.spyOn(moreSignaturesConnection, 'getSignaturesForAddress').mockResolvedValue(mockSignatures);

            const result = await withTimeout(
                getTransactionHistory(moreSignaturesConnection, wallet, { limit: 20 })
            );

            expect(result.success).toBe(true);
            expect(result.hasMore).toBe(true);
            expect(result.transactions?.length).toBeLessThanOrEqual(20);
        });
    });

    describe('getSimpleTransactionHistory', () => {
        test('should return simplified transaction history', async () => {
            const result = await withTimeout(
                get20Transactions(connection, wallet)
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toBeDefined();
            expect(Array.isArray(result.transactions)).toBe(true);
            expect(result.error).toBeUndefined();
        });

        test('should use custom limit', async () => {
            const result = await withTimeout(
                get20Transactions(connection, wallet, 5)
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toBeDefined();
        });

        test('should handle errors gracefully', async () => {
            const errorConnection = createTestConnection();
            jest.spyOn(errorConnection, 'getSignaturesForAddress').mockRejectedValue(
                new Error('Connection failed')
            );

            const result = await withTimeout(
                get20Transactions(errorConnection, wallet)
            );

            expect(result.success).toBe(false);
            expect(result.transactions).toBeNull();
            expect(result.error).toBeDefined();
        });
    });


    describe('Edge Cases', () => {
        test('should handle mixed successful and failed transaction parsing', async () => {
            const mixedConnection = createTestConnection();
            jest.spyOn(mixedConnection, 'getParsedTransactions').mockResolvedValue([
                {
                    slot: 114,
                    transaction: {
                        message: { instructions: [], accountKeys: [] },
                        signatures: ['sig1']
                    },
                    meta: { err: null, fee: 5000, preBalances: [1000000], postBalances: [995000] }
                },
                null, // Failed transaction
                {
                    slot: 115,
                    transaction: {
                        message: { instructions: [], accountKeys: [] },
                        signatures: ['sig3']
                    },
                    meta: { err: null, fee: 5000, preBalances: [1000000], postBalances: [995000] }
                }
            ]);

            const result = await withTimeout(
                getTransactionHistory(mixedConnection, wallet)
            );

            expect(result.success).toBe(true);
            expect(result.transactions?.length).toBe(2); // Only successful ones
        });

        test('should handle very old signatures', async () => {
            const oldSignatureConnection = createTestConnection();
            jest.spyOn(oldSignatureConnection, 'getSignaturesForAddress').mockResolvedValue([
                {
                    signature: 'oldSig',
                    slot: 1,
                    err: null,
                    memo: null,
                    blockTime: 1577836800 // Jan 1, 2020
                }
            ]);

            const result = await withTimeout(
                getTransactionHistory(oldSignatureConnection, wallet)
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toBeDefined();
        });

        test('should handle failed signatures', async () => {
            const failedSigConnection = createTestConnection();
            jest.spyOn(failedSigConnection, 'getSignaturesForAddress').mockResolvedValue([
                {
                    signature: 'failedSig',
                    slot: 114,
                    err: { InstructionError: [0, 'CustomError'] },
                    memo: null,
                    blockTime: 1639926816
                }
            ]);

            const result = await withTimeout(
                getTransactionHistory(failedSigConnection, wallet)
            );

            expect(result.success).toBe(true);
            expect(result.signatures).toBeDefined();
            expect(result.signatures?.[0]?.err).not.toBeNull();
        });
    });

    describe('Performance', () => {
        test('should complete within reasonable time', async () => {
            const startTime = Date.now();
            
            await withTimeout(
                getTransactionHistory(connection, wallet),
                10000
            );
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(10000);
        });

        test('should handle concurrent requests', async () => {
            const promises = Array.from({ length: 3 }, () =>
                getTransactionHistory(connection, wallet, { limit: 5 })
            );

            const results = await Promise.all(promises);

            results.forEach(result => {
                expect(result.success).toBe(true);
                expect(result.transactions).toBeDefined();
            });
        });

        test('should handle multiple wallets efficiently', async () => {
            const wallets = Array.from({ length: 3 }, () => createTestWallet());
            
            const promises = wallets.map(w =>
                getTransactionHistory(connection, w, { limit: 5 })
            );

            const results = await Promise.all(promises);

            results.forEach(result => {
                expect(result.success).toBe(true);
                expect(result.transactions).toBeDefined();
            });
        });
    });

    describe('Wallet Compatibility', () => {
        test('should work with different wallet public keys', async () => {
            const wallet1 = createTestWallet();
            const wallet2 = createTestWallet();

            const [result1, result2] = await Promise.all([
                getTransactionHistory(connection, wallet1, { limit: 5 }),
                getTransactionHistory(connection, wallet2, { limit: 5 })
            ]);

            expect(result1.success).toBe(true);
            expect(result2.success).toBe(true);
            expect(wallet1.publicKey.toString()).not.toBe(wallet2.publicKey.toString());
        });

        test('should maintain consistent results for same wallet', async () => {
            const results = await Promise.all([
                getTransactionHistory(connection, wallet, { limit: 10 }),
                getTransactionHistory(connection, wallet, { limit: 10 })
            ]);

            expect(results[0].success).toBe(results[1].success);
            expect(results[0].transactions?.length).toBe(results[1].transactions?.length);
        });
    });
}); 