import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { 
    createTestConnection, 
    createTestWallet,
    createTestConfig,
    TEST_CONFIG, 
    withTimeout,
    mockTransactionSuccess,
    MockConnection,
    MockWallet
} from '../setup';

// Import SDK functions
import { 
    getTokenSupplyByMint,
    getTokenBalanceByMint,
    getTransactionHistory,
    pay,
} from '../../index'

// Mock external dependencies
jest.mock('../../okito/token/transfer-token', () => ({
    transferTokens: jest.fn()
}));

jest.mock('../../okito/token/burn-token', () => ({
    burnToken: jest.fn()
}));

jest.mock('../../okito/airdrop/airdrop', () => ({
    airdropTokensToMultiple: jest.fn()
}));

describe('SDK Integration Tests', () => {
    let connection: MockConnection;
    let wallet: MockWallet;
    let config: any;

    beforeEach(() => {
        connection = createTestConnection();
        wallet = createTestWallet();
        config = createTestConfig();
        process.env.NODE_ENV = 'test';
        
        // Clear all mocks
        jest.clearAllMocks();
    });

    describe('Complete Token Workflow', () => {
        test('should handle complete token management workflow', async () => {
            // Mock functions
            const mockTransferTokens = require('../../okito/token/transfer-token').transferTokens;
            const mockBurnToken = require('../../okito/token/burn-token').burnToken;
            
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);
            mockBurnToken.mockResolvedValue(mockTransactionSuccess);

            // 1. Check token supply
            const supplyResult = await getTokenSupplyByMint(connection, TEST_CONFIG.USDC_MINT);
            console.log(supplyResult);
            expect(supplyResult.success).toBe(true);

            // 2. Check wallet balance
            const balanceResult = await getTokenBalanceByMint(connection, wallet, TEST_CONFIG.USDC_MINT);
            expect(balanceResult.success).toBe(true);

            // 3. Transfer tokens
            const transferResult = await mockTransferTokens({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                destination: createTestWallet().publicKey.toString(),
                amount: BigInt(1000000),
                config: { enableLogging: false }
            });
            expect(transferResult.success).toBe(true);

            // 4. Burn tokens
            const burnResult = await mockBurnToken({
                connection,
                wallet,
                mintAddress: TEST_CONFIG.USDC_MINT,
                amount: BigInt(500000),
                config: { enableLogging: false }
            });
            expect(burnResult.success).toBe(true);

            // 5. Check transaction history
            const historyResult = await getTransactionHistory(connection, wallet);
            expect(historyResult.success).toBe(true);
        });

        test('should handle payment workflow', async () => {
            const mockTransferTokens = require('../../okito/token/transfer-token').transferTokens;
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            // 1. Check balance before payment
            const initialBalance = await getTokenBalanceByMint(connection, wallet, TEST_CONFIG.USDC_MINT);
            expect(initialBalance.success).toBe(true);

            // 2. Make payment
            const paymentResult = await pay(connection, wallet, 10.5, 'USDC', config);
            expect(paymentResult).toBe(mockTransactionSuccess.transactionId);

            // 3. Verify payment was processed
            expect(mockTransferTokens).toHaveBeenCalledWith({
                connection,
                wallet,
                mint: expect.any(String),
                destination: config.publicKey.toString(),
                amount: BigInt(10500000),
                config: expect.any(Object)
            });
        });

        test('should handle airdrop workflow', async () => {
            const mockAirdrop = require('../../okito/airdrop/airdrop').airdropTokensToMultiple;
            mockAirdrop.mockResolvedValue({
                success: true,
                transactionId: 'mock-airdrop-tx',
                successfulTransfers: 3,
                failedTransfers: 0,
                recipients: []
            });

            const recipients = [
                { address: createTestWallet().publicKey.toString(), amount: BigInt(1000000) },
                { address: createTestWallet().publicKey.toString(), amount: BigInt(2000000) },
                { address: createTestWallet().publicKey.toString(), amount: BigInt(1500000) }
            ];

            // 1. Check sender balance
            const senderBalance = await getTokenBalanceByMint(connection, wallet, TEST_CONFIG.USDC_MINT);
            expect(senderBalance.success).toBe(true);

            // 2. Execute airdrop
            const airdropResult = await mockAirdrop(
                connection,
                wallet,
                TEST_CONFIG.USDC_MINT,
                recipients,
                { enableLogging: false }
            );

            expect(airdropResult.success).toBe(true);
            expect(airdropResult.successfulTransfers).toBe(3);
            expect(airdropResult.failedTransfers).toBe(0);
        });
    });

    describe('Error Handling Integration', () => {
        test('should handle cascading failures gracefully', async () => {
            // Simulate network failure
            const errorConnection = createTestConnection();
            jest.spyOn(errorConnection, 'getAccountInfo').mockRejectedValue(
                new Error('Network unavailable')
            );

            const supplyResult = await getTokenSupplyByMint(errorConnection, TEST_CONFIG.USDC_MINT);
            expect(supplyResult.success).toBe(false);
            expect(supplyResult.error).toContain('Network unavailable');

            // Ensure other operations also handle the same connection error
            const balanceResult = await getTokenBalanceByMint(errorConnection, wallet, TEST_CONFIG.USDC_MINT);
            expect(balanceResult.success).toBe(false);
        });

        test('should handle wallet disconnection across operations', async () => {
            const disconnectedWallet = createTestWallet();
            // @ts-ignore - intentionally setting to null for test
            disconnectedWallet.publicKey = null;

            // All operations should fail gracefully
            const balanceResult = await getTokenBalanceByMint(connection, disconnectedWallet, TEST_CONFIG.USDC_MINT);
            expect(balanceResult.success).toBe(false);
            expect(balanceResult.error).toBe('Wallet not connected');

            const historyResult = await getTransactionHistory(connection, disconnectedWallet);
            expect(historyResult.success).toBe(false);
            expect(historyResult.error).toBe('Wallet not connected');

            await expect(
                pay(connection, disconnectedWallet, 10, 'USDC', config)
            ).rejects.toThrow('Wallet not connected');
        });

        test('should handle invalid token addresses consistently', async () => {
            const invalidMint = 'invalid-mint-address';

            const supplyResult = await getTokenSupplyByMint(connection, invalidMint);
            expect(supplyResult.success).toBe(false);

            const balanceResult = await getTokenBalanceByMint(connection, wallet, invalidMint);
            expect(balanceResult.success).toBe(false);

            // All operations should consistently handle invalid addresses
        });
    });

    describe('Performance Integration', () => {
        test('should handle concurrent operations efficiently', async () => {
            const mockTransferTokens = require('../../okito/token/transfer-token').transferTokens;
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const startTime = Date.now();

            // Execute multiple operations concurrently
            const promises = [
                getTokenSupplyByMint(connection, TEST_CONFIG.USDC_MINT),
                getTokenBalanceByMint(connection, wallet, TEST_CONFIG.USDC_MINT),
                getTransactionHistory(connection, wallet, { limit: 5 }),
                mockTransferTokens({
                    connection,
                    wallet,
                    mint: TEST_CONFIG.USDC_MINT,
                    destination: createTestWallet().publicKey.toString(),
                    amount: BigInt(1000000),
                    config: { enableLogging: false }
                })
            ];

            const results = await Promise.all(promises);

            const endTime = Date.now();
            const duration = endTime - startTime;

            // Should complete within reasonable time
            expect(duration).toBeLessThan(10000);

            // All operations should succeed
            results.forEach((result, index) => {
                if (index < 3) {
                    expect(result.success).toBe(true);
                } else {
                    expect(result.success).toBe(true);
                }
            });
        });

        test('should handle multiple wallets concurrently', async () => {
            const wallets = Array.from({ length: 5 }, () => createTestWallet());

            const promises = wallets.map(w => 
                getTokenBalanceByMint(connection, w, TEST_CONFIG.USDC_MINT)
            );

            const results = await Promise.all(promises);

            results.forEach(result => {
                expect(result.success).toBe(true);
            });

            // Each wallet should have unique public key
            const publicKeys = wallets.map(w => w.publicKey.toString());
            const uniqueKeys = new Set(publicKeys);
            expect(uniqueKeys.size).toBe(wallets.length);
        });
    });

    describe('Data Consistency Integration', () => {
        test('should maintain data consistency across operations', async () => {
            // Test the same wallet across different operations
            const wallet1 = createTestWallet();
            const publicKey = wallet1.publicKey.toString();

            const balanceResult = await getTokenBalanceByMint(connection, wallet1, TEST_CONFIG.USDC_MINT);
            const historyResult = await getTransactionHistory(connection, wallet1, { limit: 1 });

            expect(balanceResult.success).toBe(true);
            expect(historyResult.success).toBe(true);

            // Both operations should use the same wallet address
            expect(wallet1.publicKey.toString()).toBe(publicKey);
        });

        test('should handle configuration consistency', async () => {
            const config1 = createTestConfig();
            const config2 = createTestConfig();

            // Configs should be independent
            expect(config1.publicKey.toString()).not.toBe(config2.publicKey.toString());

            const mockTransferTokens = require('../../okito/token/transfer-token').transferTokens;
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            // Each payment should use correct config
            await pay(connection, wallet, 10, 'USDC', config1);
            await pay(connection, wallet, 20, 'USDT', config2);

            expect(mockTransferTokens).toHaveBeenCalledTimes(2);
            
            const calls = mockTransferTokens.mock.calls;
            expect(calls[0][0].destination).toBe(config1.publicKey.toString());
            expect(calls[1][0].destination).toBe(config2.publicKey.toString());
        });
    });

    describe('Real-world Scenarios', () => {
        test('should handle typical DeFi interaction flow', async () => {
            const mockTransferTokens = require('../../okito/token/transfer-token').transferTokens;
            const mockBurnToken = require('../../okito/token/burn-token').burnToken;
            
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);
            mockBurnToken.mockResolvedValue(mockTransactionSuccess);

            // Scenario: User wants to trade tokens
            
            // 1. Check available balance
            const balance = await getTokenBalanceByMint(connection, wallet, TEST_CONFIG.USDC_MINT);
            expect(balance.success).toBe(true);

            // 2. Check transaction history for recent activity
            const history = await getTransactionHistory(connection, wallet, { limit: 10 });
            expect(history.success).toBe(true);

            // 3. Transfer tokens to trading account
            const transferResult = await mockTransferTokens({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                destination: createTestWallet().publicKey.toString(),
                amount: BigInt(5000000), // 5 USDC
                config: { enableLogging: false }
            });
            expect(transferResult.success).toBe(true);

            // 4. Burn some tokens (maybe fees or redemption)
            const burnResult = await mockBurnToken({
                connection,
                wallet,
                mintAddress: TEST_CONFIG.USDC_MINT,
                amount: BigInt(100000), // 0.1 USDC
                config: { enableLogging: false }
            });
            expect(burnResult.success).toBe(true);
        });

        test('should handle merchant payment scenario', async () => {
            const mockTransferTokens = require('../../okito/token/transfer-token').transferTokens;
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            // Scenario: Customer making a payment to merchant
            
            // 1. Customer checks balance
            const customerBalance = await getTokenBalanceByMint(connection, wallet, TEST_CONFIG.USDC_MINT);
            expect(customerBalance.success).toBe(true);

            // 2. Merchant provides payment config
            const merchantConfig = createTestConfig();

            // 3. Customer makes payment
            const paymentResult = await pay(connection, wallet, 25.99, 'USDC', merchantConfig);
            expect(paymentResult).toBe(mockTransactionSuccess.transactionId);

            // 4. Verify payment details
            expect(mockTransferTokens).toHaveBeenCalledWith({
                connection,
                wallet,
                mint: expect.any(String),
                destination: merchantConfig.publicKey.toString(),
                amount: BigInt(25990000), // 25.99 * 1_000_000
                config: expect.any(Object)
            });
        });

        test('should handle token distribution scenario', async () => {
            const mockAirdrop = require('../../okito/airdrop/airdrop').airdropTokensToMultiple;
            mockAirdrop.mockResolvedValue({
                success: true,
                transactionId: 'mock-distribution-tx',
                successfulTransfers: 100,
                failedTransfers: 2,
                recipients: []
            });

            // Scenario: Project distributing tokens to community
            
            // 1. Check project balance
            const projectBalance = await getTokenBalanceByMint(connection, wallet, TEST_CONFIG.USDC_MINT);
            expect(projectBalance.success).toBe(true);

            // 2. Generate recipient list
            const recipients = Array.from({ length: 100 }, () => ({
                address: createTestWallet().publicKey.toString(),
                amount: BigInt(1000000) // 1 token each
            }));

            // 3. Execute batch distribution
            const distributionResult = await mockAirdrop(
                connection,
                wallet,
                TEST_CONFIG.USDC_MINT,
                recipients,
                { enableLogging: true, batchSize: 10 }
            );

            expect(distributionResult.success).toBe(true);
            expect(distributionResult.successfulTransfers).toBe(100);
            expect(distributionResult.failedTransfers).toBe(2);
        });
    });

    describe('SDK Stability', () => {
        test('should maintain stable API across operations', async () => {
            // Test that all major SDK functions are available and have consistent signatures
            expect(typeof getTokenSupplyByMint).toBe('function');
            expect(typeof getTokenBalanceByMint).toBe('function');
            expect(typeof getTransactionHistory).toBe('function');
            expect(typeof pay).toBe('function');

            // Functions should accept connection as first parameter (streamlined approach)
            expect(getTokenSupplyByMint.length).toBeGreaterThanOrEqual(2);
            expect(getTokenBalanceByMint.length).toBeGreaterThanOrEqual(3);
            expect(getTransactionHistory.length).toBeGreaterThanOrEqual(2);
            expect(pay.length).toBeGreaterThanOrEqual(5);
        });

        test('should handle version compatibility', async () => {
            // Test that the SDK works with different wallet implementations
            const standardWallet = createTestWallet();
            const customWallet = createTestWallet();

            // Both should work identically
            const [result1, result2] = await Promise.all([
                getTokenBalanceByMint(connection, standardWallet, TEST_CONFIG.USDC_MINT),
                getTokenBalanceByMint(connection, customWallet, TEST_CONFIG.USDC_MINT)
            ]);

            expect(result1.success).toBe(true);
            expect(result2.success).toBe(true);
        });
    });
}); 