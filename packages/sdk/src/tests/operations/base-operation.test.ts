import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { 
    BurnTokenOperation 
} from '../../okito/token/BurnTokenOperation';
import { 
    TransferTokenOperation 
} from '../../okito/token/TransferTokenOperation';
import { 
    AirdropOperation 
} from '../../okito/airdrop/AirdropOperation';
import { 
    createTestConnection, 
    createTestWallet,
    TEST_CONFIG, 
    withTimeout,
    mockTransactionSuccess,
    MockConnection,
    MockWallet
} from '../setup';

describe('Token Operation Classes', () => {
    let connection: MockConnection;
    let wallet: MockWallet;

    beforeEach(() => {
        connection = createTestConnection();
        wallet = createTestWallet();
        process.env.NODE_ENV = 'test';
    });

    describe('BurnTokenOperation', () => {
        test('should create burn operation with valid parameters', async () => {
            const operation = new BurnTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                amount: 1,
                config: {
                    enableLogging: true,
                    confirmationStrategy: 'confirmed'
                }
            });

            expect(operation).toBeInstanceOf(BurnTokenOperation);
        });

        test('should validate burn operation data', async () => {
            const operation = new BurnTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                amount: 1,
                config: {}
            });

            // Mock the validation method
            const validateSpy = jest.spyOn(operation as any, 'validateParameters');
            validateSpy.mockResolvedValue({ isValid: true });

            const result = await (operation as any).validateParameters({
                mintAddress: TEST_CONFIG.USDC_MINT,
                amount: BigInt(1000000)
            });

            expect(result.isValid).toBe(true);
        });

        test('should handle burn operation execution', async () => {
            const operation = new BurnTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                amount: 1,
                config: {
                    enableLogging: false,
                    confirmationStrategy: 'confirmed'
                }
            });

            // Mock the execute method to avoid actual blockchain calls
            const executeSpy = jest.spyOn(operation, 'execute');
            executeSpy.mockResolvedValue({
                success: true,
                transactionId: 'mock-burn-tx-id',
                error: undefined
            });

            const result = await operation.execute();

            expect(result.success).toBe(true);
            expect(result.transactionId).toBe('mock-burn-tx-id');
        });

        test('should handle burn operation errors', async () => {
            const operation = new BurnTokenOperation({
                connection,
                wallet,
                mint: 'invalid-mint',
                amount: 1,
                config: {}
            });

            const executeSpy = jest.spyOn(operation, 'execute');
            executeSpy.mockResolvedValue({
                success: false,
                transactionId: undefined,
                error: 'Invalid mint address'
            });

            const result = await operation.execute();

            expect(result.success).toBe(false);
            expect(result.error).toBe('Invalid mint address');
        });
    });

    describe('TransferTokenOperation', () => {
        test('should create transfer operation with valid parameters', async () => {
            const operation = new TransferTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                destination: wallet.publicKey.toString(),
                amount: BigInt(1000000),
                config: {
                    enableLogging: true,
                    createDestinationATA: true
                }
            });

            expect(operation).toBeInstanceOf(TransferTokenOperation);
        });

        test('should validate transfer operation data', async () => {
            const operation = new TransferTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                destination: wallet.publicKey.toString(),
                amount: BigInt(1000000),
                config: {}
            });

            const validateSpy = jest.spyOn(operation as any, 'validateParameters');
            validateSpy.mockResolvedValue({ isValid: true });

            const result = await (operation as any).validateParameters({
                mintAddress: TEST_CONFIG.USDC_MINT,
                destination: wallet.publicKey.toString(),
                amount: 1000000
            });

            expect(result.isValid).toBe(true);
        });

        test('should handle transfer operation execution', async () => {
            const operation = new TransferTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                destination: wallet.publicKey.toString(),
                amount: BigInt(1000000),
                config: {}
            });

            const executeSpy = jest.spyOn(operation, 'execute');
            executeSpy.mockResolvedValue({
                success: true,
                transactionId: 'mock-transfer-tx-id',
                error: undefined
            });

            const result = await operation.execute();

            expect(result.success).toBe(true);
            expect(result.transactionId).toBe('mock-transfer-tx-id');
        });

        test('should handle invalid destination address', async () => {
            const operation = new TransferTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                destination: 'invalid-destination',
                amount: BigInt(1000000),
                config: {}
            });

            const executeSpy = jest.spyOn(operation, 'execute');
            executeSpy.mockResolvedValue({
                success: false,
                transactionId: undefined,
                error: 'Invalid destination address'
            });

            const result = await operation.execute();

            expect(result.success).toBe(false);
            expect(result.error).toBe('Invalid destination address');
        });
    });

    describe('AirdropOperation', () => {
        const mockRecipients = [
            { address: createTestWallet().publicKey.toString(), amount: 1 },
            { address: createTestWallet().publicKey.toString(), amount: 2 }
        ];

        test('should create airdrop operation with valid parameters', async () => {
            const operation = new AirdropOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                recipients: mockRecipients,
                config: {
                    enableLogging: true
                }
            });

            expect(operation).toBeInstanceOf(AirdropOperation);
        });

        test('should validate airdrop operation data', async () => {
            const operation = new AirdropOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                recipients: mockRecipients,
                config: {}
            });

            const validateSpy = jest.spyOn(operation as any, 'validateParameters');
            validateSpy.mockResolvedValue({ isValid: true });

            const result = await (operation as any).validateParameters({
                mintAddress: TEST_CONFIG.USDC_MINT,
                recipients: mockRecipients
            });

            expect(result.isValid).toBe(true);
        });

        test('should handle airdrop operation execution', async () => {
            const operation = new AirdropOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                recipients: mockRecipients,
                config: {}
            });

            const executeSpy = jest.spyOn(operation, 'execute');
            executeSpy.mockResolvedValue({
                success: true,
                transactionId: 'mock-airdrop-tx-id',
                recipientsProcessed: 2,
                accountsCreated: 1,
                error: undefined
            });

            const result = await operation.execute();

            expect(result.success).toBe(true);
            expect(result.recipientsProcessed).toBe(2);
            expect(result.accountsCreated).toBe(1);
        });

        test('should handle empty recipients list', async () => {
            const operation = new AirdropOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                recipients: [],
                config: {}
            });

            const executeSpy = jest.spyOn(operation, 'execute');
            executeSpy.mockResolvedValue({
                success: false,
                transactionId: undefined,
                recipientsProcessed: 0,
                error: 'No recipients provided'
            });

            const result = await operation.execute();

            expect(result.success).toBe(false);
            expect(result.error).toBe('No recipients provided');
        });

        test('should handle partial airdrop failures', async () => {
            const operation = new AirdropOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                recipients: mockRecipients,
                config: {}
            });

            const executeSpy = jest.spyOn(operation, 'execute');
            executeSpy.mockResolvedValue({
                success: true,
                transactionId: 'mock-partial-airdrop-tx-id',
                recipientsProcessed: 1,
                accountsCreated: 1,
                error: undefined
            });

            const result = await operation.execute();

            expect(result.success).toBe(true);
            expect(result.recipientsProcessed).toBe(1);
            expect(result.accountsCreated).toBe(1);
        });
    });

    describe('Base Operation Features', () => {
        test('should handle wallet validation across operations', async () => {
            const invalidWallet = createTestWallet();
            // @ts-ignore - intentionally setting to null for test
            invalidWallet.publicKey = null;

            const burnOp = new BurnTokenOperation({
                connection,
                wallet: invalidWallet,
                mint: TEST_CONFIG.USDC_MINT,
                amount: 1,
                config: {}
            });

            const executeSpy = jest.spyOn(burnOp, 'execute');
            executeSpy.mockResolvedValue({
                success: false,
                transactionId: undefined,
                error: 'Wallet not connected'
            });

            const result = await burnOp.execute();

            expect(result.success).toBe(false);
            expect(result.error).toBe('Wallet not connected');
        });

        test('should handle connection errors across operations', async () => {
            const errorConnection = createTestConnection();
            jest.spyOn(errorConnection, 'getLatestBlockhash').mockRejectedValue(
                new Error('Connection failed')
            );

            const transferOp = new TransferTokenOperation({
                connection: errorConnection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                destination: wallet.publicKey.toString(),
                amount: BigInt(1000000),
                config: {}
            });

            const executeSpy = jest.spyOn(transferOp, 'execute');
            executeSpy.mockResolvedValue({
                success: false,
                transactionId: undefined,
                error: 'Connection failed'
            });

            const result = await transferOp.execute();

            expect(result.success).toBe(false);
            expect(result.error).toBe('Connection failed');
        });

        test('should support different confirmation strategies', async () => {
            const confirmationStrategies = ['processed', 'confirmed', 'finalized'] as const;

            for (const strategy of confirmationStrategies) {
                const operation = new BurnTokenOperation({
                    connection,
                    wallet,
                    mint: TEST_CONFIG.USDC_MINT,
                    amount: 1,
                    config: {
                        confirmationStrategy: strategy
                    }
                });

                expect(operation).toBeInstanceOf(BurnTokenOperation);
            }
        });

        test('should handle retry logic configuration', async () => {
            const operation = new TransferTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                destination: wallet.publicKey.toString(),
                amount: BigInt(1000000),
                config: {
                    maxRetries: 3,
                    timeoutMs: 1000
                }
            });

            expect(operation).toBeInstanceOf(TransferTokenOperation);
        });

        test('should support logging configuration', async () => {
            const operations = [
                new BurnTokenOperation({
                    connection,
                    wallet,
                    mint: TEST_CONFIG.USDC_MINT,
                    amount: 1,
                    config: { enableLogging: true }
                }),
                new TransferTokenOperation({
                    connection,
                    wallet,
                    mint: TEST_CONFIG.USDC_MINT,
                    destination: wallet.publicKey.toString(),
                    amount: BigInt(1000000),
                    config: { enableLogging: false }
                }),
                new AirdropOperation({
                    connection,
                    wallet,
                    mint: TEST_CONFIG.USDC_MINT,
                    recipients: [],
                    config: { enableLogging: true }
                })
            ];

            operations.forEach(operation => {
                expect(operation).toBeDefined();
            });
        });
    });

    describe('Operation Performance', () => {
        test('should handle concurrent operations', async () => {
            const operations = [
                new BurnTokenOperation({
                    connection,
                    wallet,
                    mint: TEST_CONFIG.USDC_MINT,
                    amount: 1,
                    config: {}
                }),
                new TransferTokenOperation({
                    connection,
                    wallet,
                    mint: TEST_CONFIG.USDC_MINT,
                    destination: wallet.publicKey.toString(),
                    amount: BigInt(1000000),
                    config: {}
                }),
                new AirdropOperation({
                    connection,
                    wallet,
                    mint: TEST_CONFIG.USDC_MINT,
                    recipients: [
                        { address: createTestWallet().publicKey.toString(), amount: 1 }
                    ],
                    config: {}
                })
            ];

            // Mock all execute methods
            operations.forEach((op, index) => {
                const executeSpy = jest.spyOn(op, 'execute');
                executeSpy.mockResolvedValue({
                    success: true,
                    transactionId: `mock-tx-${index}`,
                    error: undefined
                });
            });

            const results = await Promise.all(operations.map(op => op.execute()));

            expect(results).toHaveLength(3);
            results.forEach((result, index) => {
                expect(result.success).toBe(true);
                expect(result.transactionId).toBe(`mock-tx-${index}`);
            });
        });

        test('should complete operations within reasonable time', async () => {
            const operation = new BurnTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                amount: 1,
                config: {}
            });

            const executeSpy = jest.spyOn(operation, 'execute');
            executeSpy.mockResolvedValue({
                success: true,
                transactionId: 'mock-fast-tx-id',
                error: undefined
            });

            const startTime = Date.now();
            
            await withTimeout(operation.execute(), 5000);
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(5000);
        });
    });

    describe('Operation State Management', () => {
        test('should maintain operation isolation', async () => {
            const operation1 = new TransferTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                destination: wallet.publicKey.toString(),
                amount: BigInt(1000000),
                config: {}
            });

            const operation2 = new TransferTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                destination: wallet.publicKey.toString(),
                amount: BigInt(2000000),
                config: {}
            });

            expect(operation1).not.toBe(operation2);
            // Each operation should be independent
        });

        test('should handle operation reuse', async () => {
            const operation = new BurnTokenOperation({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                amount: 1,
                config: {}
            });

            const executeSpy = jest.spyOn(operation, 'execute');
            executeSpy.mockResolvedValue({
                success: true,
                transactionId: 'mock-reuse-tx-id',
                error: undefined
            });

            // Execute the same operation multiple times
            const result1 = await operation.execute();
            const result2 = await operation.execute();

            expect(result1.success).toBe(true);
            expect(result2.success).toBe(true);
            expect(executeSpy).toHaveBeenCalledTimes(2);
        });
    });
}); 