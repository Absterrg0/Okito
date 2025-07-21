
import { jest,expect,test,beforeEach } from '@jest/globals';
import { pay } from '../../okito/payment/pay';
import { 
    createTestConnection, 
    createTestWallet,
    createTestConfig,
    TEST_CONFIG, 
    withTimeout,
    mockTransactionSuccess,
    mockTransactionError,
    MockConnection,
    MockWallet
} from '../setup';

// Mock the transferTokens function
jest.mock('../../okito/token/transfer-token', () => ({
    transferTokens: jest.fn()
}));

import { transferTokens } from '../../okito/token/transfer-token';
import { OkitoToken } from '../../types/config';
const mockTransferTokens = transferTokens as jest.MockedFunction<typeof transferTokens>;

describe('Payment Functions', () => {
    let connection: MockConnection;
    let wallet: MockWallet;
    let config: any;

    beforeEach(() => {
        connection = createTestConnection();
        wallet = createTestWallet();
        config = createTestConfig();
        process.env.NODE_ENV = 'test';
        
        // Reset mock
        mockTransferTokens.mockClear();
    });

    describe('pay', () => {
        test('should process USDC payment successfully', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const result = await withTimeout(
                pay(connection, wallet, 10.5, 'USDC', config)
            );

            expect(result).toBe(mockTransactionSuccess.transactionId);
            expect(mockTransferTokens).toHaveBeenCalledWith({
                connection,
                wallet,
                mint: expect.any(String),
                destination: config.publicKey.toString(),
                amount: BigInt(10500000), // 10.5 * 1_000_000
                config: {
                    enableLogging: false,
                    enableSimulation: true,
                    validateBalance: true,
                    createDestinationATA: true,
                    confirmationStrategy: "confirmed"
                }
            });
        });

        test('should process USDT payment successfully', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const result = await withTimeout(
                pay(connection, wallet, 5.25, 'USDT', config)
            );

            expect(result).toBe(mockTransactionSuccess.transactionId);
            expect(mockTransferTokens).toHaveBeenCalledWith({
                connection,
                wallet,
                mint: expect.any(String),
                destination: config.publicKey.toString(),
                amount: BigInt(5250000), // 5.25 * 1_000_000
                config: expect.any(Object)
            });
        });

        test('should handle wallet without public key', async () => {
            const invalidWallet = createTestWallet();
            // @ts-ignore - intentionally setting to null for test
            invalidWallet.publicKey = null;

            await expect(
                pay(connection, invalidWallet, 10, 'USDC', config)
            ).rejects.toThrow('Wallet not connected');

            expect(mockTransferTokens).not.toHaveBeenCalled();
        });

        test('should handle wallet without signTransaction', async () => {
            const invalidWallet = createTestWallet();
            // @ts-ignore - intentionally setting signTransaction to undefined for test
            invalidWallet.signTransaction = undefined as any;

            await expect(
                pay(connection, invalidWallet, 10, 'USDC', config)
            ).rejects.toThrow('Wallet not connected');

            expect(mockTransferTokens).not.toHaveBeenCalled();
        });

        test('should handle transfer failure', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionError);

            await expect(
                pay(connection, wallet, 10, 'USDC', config)
            ).rejects.toThrow('Mock transaction failed');
        });

        test('should handle transfer failure without error message', async () => {
            mockTransferTokens.mockResolvedValue({
                success: false,
                transactionId: undefined,
                error: undefined
            });

            await expect(
                pay(connection, wallet, 10, 'USDC', config)
            ).rejects.toThrow('Payment failed');
        });

        test('should convert amounts correctly', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            // Test various amounts
            const testCases = [
                { amount: 1, expected: BigInt(1000000) },
                { amount: 0.5, expected: BigInt(500000) },
                { amount: 100.123456, expected: BigInt(100123456) },
                { amount: 0.000001, expected: BigInt(1) },
                { amount: 1000000, expected: BigInt(1000000000000) }
            ];

            for (const testCase of testCases) {
                mockTransferTokens.mockClear();
                
                await pay(connection, wallet, testCase.amount, 'USDC', config);
                
                expect(mockTransferTokens).toHaveBeenCalledWith(
                    expect.objectContaining({
                        amount: testCase.expected
                    })
                );
            }
        });

        test('should use config tokens correctly', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const customConfig = {
                ...config,
                tokens: ['USDT', 'USDC'] as const
            };

            await pay(connection, wallet, 10, 'USDT', customConfig);

            expect(mockTransferTokens).toHaveBeenCalledWith(
                expect.objectContaining({
                    mint: expect.any(String)
                })
            );
        });

        test('should handle zero amount', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            await pay(connection, wallet, 0, 'USDC', config);

            expect(mockTransferTokens).toHaveBeenCalledWith(
                expect.objectContaining({
                    amount: BigInt(0)
                })
            );
        });

        test('should handle fractional amounts correctly', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            await pay(connection, wallet, 0.123456, 'USDC', config);

            expect(mockTransferTokens).toHaveBeenCalledWith(
                expect.objectContaining({
                    amount: BigInt(123456) // 0.123456 * 1_000_000
                })
            );
        });

        test('should handle very small amounts', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            await pay(connection, wallet, 0.000001, 'USDC', config);

            expect(mockTransferTokens).toHaveBeenCalledWith(
                expect.objectContaining({
                    amount: BigInt(1) // Minimum unit
                })
            );
        });

        test('should handle transfer function throwing error', async () => {
            mockTransferTokens.mockRejectedValue(new Error('Network error'));

            await expect(
                pay(connection, wallet, 10, 'USDC', config)
            ).rejects.toThrow('Network error');
        });
    });

    describe('Edge Cases', () => {
        test('should handle very large amounts', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const largeAmount = 999999999;
            await pay(connection, wallet, largeAmount, 'USDC', config);

            expect(mockTransferTokens).toHaveBeenCalledWith(
                expect.objectContaining({
                    amount: BigInt(largeAmount * 1000000)
                })
            );
        });

        test('should handle negative amounts (edge case)', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            // Note: This is an edge case - in real usage you'd want to validate amounts
            await pay(connection, wallet, -10, 'USDC', config);

            expect(mockTransferTokens).toHaveBeenCalledWith(
                expect.objectContaining({
                    amount: BigInt(-10000000)
                })
            );
        });

        test('should handle config with different token order', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const reorderedConfig = {
                ...config,
                tokens: ['USDT', 'USDC'] as const
            };

            await pay(connection, wallet, 10, 'USDC', reorderedConfig);

            expect(mockTransferTokens).toHaveBeenCalled();
        });

        test('should handle missing config properties gracefully', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const minimalConfig = {
                network: TEST_CONFIG.NETWORK,
                rpcUrl: TEST_CONFIG.RPC_URL,
                publicKey: config.publicKey,
                tokens: ['USDC','USDT'] as [OkitoToken, OkitoToken]
            };

            await pay(connection, wallet, 10, 'USDC', minimalConfig);

            expect(mockTransferTokens).toHaveBeenCalledWith(
                expect.objectContaining({
                    destination: minimalConfig.publicKey.toString()
                })
            );
        });
    });

    describe('Performance', () => {
        test('should complete payment within reasonable time', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const startTime = Date.now();
            
            await withTimeout(
                pay(connection, wallet, 10, 'USDC', config),
                5000
            );
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(5000);
        });

        test('should handle concurrent payments', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const promises = Array.from({ length: 3 }, (_, i) =>
                pay(connection, wallet, 10 + i, 'USDC', config)
            );

            const results = await Promise.all(promises);

            expect(results).toHaveLength(3);
            results.forEach(result => {
                expect(result).toBe(mockTransactionSuccess.transactionId);
            });
            expect(mockTransferTokens).toHaveBeenCalledTimes(3);
        });
    });

    describe('Configuration Validation', () => {
        test('should work with different wallet implementations', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const wallet1 = createTestWallet();
            const wallet2 = createTestWallet();

            const results = await Promise.all([
                pay(connection, wallet1, 10, 'USDC', config),
                pay(connection, wallet2, 20, 'USDT', config)
            ]);

            expect(results).toHaveLength(2);
            expect(mockTransferTokens).toHaveBeenCalledTimes(2);
        });

        test('should maintain proper configuration isolation', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const config1 = createTestConfig();
            const config2 = createTestConfig();

            await Promise.all([
                pay(connection, wallet, 10, 'USDC', config1),
                pay(connection, wallet, 20, 'USDT', config2)
            ]);

            expect(mockTransferTokens).toHaveBeenCalledTimes(2);
            
            // Verify each call used the correct config
            const calls = mockTransferTokens.mock.calls;
            expect(calls[0][0].destination).toBe(config1.publicKey.toString());
            expect(calls[1][0].destination).toBe(config2.publicKey.toString());
        });
    });

    describe('Transfer Configuration', () => {
        test('should use correct transfer configuration', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            await pay(connection, wallet, 10, 'USDC', config);

            expect(mockTransferTokens).toHaveBeenCalledWith(
                expect.objectContaining({
                    config: {
                        enableLogging: false,
                        enableSimulation: true,
                        validateBalance: true,
                        createDestinationATA: true,
                        confirmationStrategy: "confirmed"
                    }
                })
            );
        });

        test('should maintain transfer config consistency', async () => {
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            // Multiple calls should use same config
            await Promise.all([
                pay(connection, wallet, 10, 'USDC', config),
                pay(connection, wallet, 20, 'USDT', config)
            ]);

            const calls = mockTransferTokens.mock.calls;
            expect(calls[0][0].config).toEqual(calls[1][0].config);
        });
    });
}); 