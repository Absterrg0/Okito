import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { Okito } from '../../okito/Okito';
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

// Mock all the underlying functions since they're tested separately
jest.mock('../../okito/token/transfer-token', () => ({
    transferTokens: jest.fn()
}));

jest.mock('../../okito/token/burn-token', () => ({
    burnToken: jest.fn()
}));

jest.mock('../../okito/token/launch-token', () => ({
    createNewToken: jest.fn(),
    updateTokenImage: jest.fn()
}));

jest.mock('../../okito/airdrop/airdrop', () => ({
    airdropTokensToMultiple: jest.fn(),
    airdropTokenToAddress: jest.fn(),
    airdropTokensBatch: jest.fn()
}));

jest.mock('../../okito/NFT/create', () => ({
    createNFT: jest.fn(),
    createNFTBatch: jest.fn()
}));

jest.mock('../../okito/SOL/wrap', () => ({
    wrapSol: jest.fn()
}));

jest.mock('../../okito/payment/pay', () => ({
    pay: jest.fn()
}));

describe('Okito Class Tests', () => {
    let okito: Okito;
    let connection: MockConnection;
    let wallet: MockWallet;
    let config: any;

    beforeEach(() => {
        connection = createTestConnection();
        wallet = createTestWallet();
        config = createTestConfig();
        process.env.NODE_ENV = 'test';
        
        // Create Okito instance once per test
        okito = new Okito(config, wallet, connection);
        
        // Clear all mocks
        jest.clearAllMocks();
    });

    describe('Class Initialization', () => {
        test('should initialize Okito class with proper configuration', () => {
            expect(okito).toBeInstanceOf(Okito);
            expect(okito.getConnection()).toBe(connection);
            expect(okito.getWallet()).toBe(wallet);
            expect(okito.getConfig()).toBeDefined();
            expect(okito.getConfig().network).toBe('devnet');
        });

        test('should have all namespace properties', () => {
            expect(okito.account).toBeDefined();
            expect(okito.tokens).toBeDefined();
            expect(okito.payments).toBeDefined();
            expect(okito.airdrop).toBeDefined();
            expect(okito.nft).toBeDefined();
            expect(okito.sol).toBeDefined();
        });

        test('should create connection from config when not provided', () => {
            const okitoWithoutConnection = new Okito(config, wallet);
            expect(okitoWithoutConnection.getConnection()).toBeDefined();
        });
    });

    describe('Account Operations', () => {
        test('should get token balance by mint address', async () => {
            const result = await withTimeout(
                okito.account.getBalance(TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.balance).toBeDefined();
        });

        test('should get token balance by symbol', async () => {
            const result = await withTimeout(
                okito.account.getBalanceBySymbol('USDC', 'devnet')
            );

            expect(result.success).toBe(true);
            expect(result.balance).toBeDefined();
        });

        test('should get transaction history with options', async () => {
            const result = await withTimeout(
                okito.account.getTransactionHistory({ limit: 10 })
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toBeDefined();
        });

        test('should get last 20 transactions', async () => {
            const result = await withTimeout(
                okito.account.get20Transactions()
            );

            expect(result.success).toBe(true);
            expect(result.transactions).toBeDefined();
        });
    });

    describe('Token Operations', () => {
        test('should get token supply by mint address', async () => {
            const result = await withTimeout(
                okito.tokens.getSupply(TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.supply).toBeDefined();
        });

        test('should get token supply by symbol', async () => {
            const result = await withTimeout(
                okito.tokens.getSupplyBySymbol('USDC', 'devnet')
            );

            expect(result.success).toBe(true);
            expect(result.supply).toBeDefined();
        });

        test('should transfer tokens with proper parameters', async () => {
            const mockTransferTokens = require('../../okito/token/transfer-token').transferTokens;
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);

            const result = await okito.tokens.transfer({
                mint: TEST_CONFIG.USDC_MINT,
                destination: createTestWallet().publicKey.toString(),
                amount: BigInt(1000000),
                config: {
                    enableLogging: true,
                    priorityFee: 1000
                }
            });

            expect(result.success).toBe(true);
            expect(mockTransferTokens).toHaveBeenCalledWith({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                destination: expect.any(String),
                amount: BigInt(1000000),
                config: expect.objectContaining({
                    enableLogging: true,
                    priorityFee: 1000
                })
            });
        });

        test('should burn tokens with proper parameters', async () => {
            const mockBurnToken = require('../../okito/token/burn-token').burnToken;
            mockBurnToken.mockResolvedValue(mockTransactionSuccess);

            const result = await okito.tokens.burn({
                mint: TEST_CONFIG.USDC_MINT,
                amount: 500000,
                config: {
                    enableLogging: true
                }
            });

            expect(result.success).toBe(true);
            expect(mockBurnToken).toHaveBeenCalledWith({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                amount: 500000,
                config: expect.objectContaining({
                    enableLogging: true
                })
            });
        });

        test('should create new token with proper parameters', async () => {
            const mockCreateNewToken = require('../../okito/token/launch-token').createNewToken;
            mockCreateNewToken.mockResolvedValue({
                success: true,
                mintAddress: 'new-token-mint',
                transactionId: 'mock-tx-id'
            });

            const tokenData = {
                name: 'Test Token',
                symbol: 'TEST',
                imageUrl: 'https://example.com/image.png',
                initialSupply: 1000000,
                decimals: 6,
                freezeAuthority: true,
                description: 'Test token description'
            };

            const result = await okito.tokens.create(tokenData, {
                enableLogging: true,
                priorityFee: 5000
            });

            expect(result.success).toBe(true);
            expect(mockCreateNewToken).toHaveBeenCalledWith({
                wallet,
                connection,
                tokenData,
                config: expect.objectContaining({
                    enableLogging: true,
                    priorityFee: 5000
                })
            });
        });

        test('should update token image with proper parameters', async () => {
            const mockUpdateTokenImage = require('../../okito/token/launch-token').updateTokenImage;
            mockUpdateTokenImage.mockResolvedValue({
                success: true,
                transactionId: 'mock-update-tx-id'
            });

            const result = await okito.tokens.updateImage({
                mintAddress: TEST_CONFIG.USDC_MINT,
                newImageUrl: 'https://example.com/new-image.png',
                config: {
                    enableLogging: true
                }
            });

            expect(result.success).toBe(true);
            expect(mockUpdateTokenImage).toHaveBeenCalledWith(
                wallet,
                connection,
                TEST_CONFIG.USDC_MINT,
                'https://example.com/new-image.png',
                expect.objectContaining({
                    enableLogging: true
                })
            );
        });
    });

    describe('Payment Operations', () => {
        test('should make USDC payment', async () => {
            const mockPay = require('../../okito/payment/pay').pay;
            mockPay.mockResolvedValue('mock-payment-tx-id');

            const result = await okito.payments.pay(25.99, 'USDC');

            expect(result).toBe('mock-payment-tx-id');
            expect(mockPay).toHaveBeenCalledWith(
                connection,
                wallet,
                25.99,
                'USDC',
                okito.getConfig()
            );
        });

        test('should make USDT payment', async () => {
            const mockPay = require('../../okito/payment/pay').pay;
            mockPay.mockResolvedValue('mock-usdt-payment-tx-id');

            const result = await okito.payments.pay(10.5, 'USDT');

            expect(result).toBe('mock-usdt-payment-tx-id');
            expect(mockPay).toHaveBeenCalledWith(
                connection,
                wallet,
                10.5,
                'USDT',
                okito.getConfig()
            );
        });
    });

    describe('Airdrop Operations', () => {
        const mockRecipients = [
            { address: createTestWallet().publicKey.toString(), amount: 1000000 },
            { address: createTestWallet().publicKey.toString(), amount: 2000000 },
            { address: createTestWallet().publicKey.toString(), amount: 1500000 }
        ];

        test('should airdrop to multiple recipients', async () => {
            const mockAirdropMultiple = require('../../okito/airdrop/airdrop').airdropTokensToMultiple;
            mockAirdropMultiple.mockResolvedValue({
                success: true,
                transactionId: 'mock-airdrop-tx',
                recipientsProcessed: 3
            });

            const result = await okito.airdrop.toMultiple(
                TEST_CONFIG.USDC_MINT,
                mockRecipients,
                {
                    enableLogging: true,
                    createRecipientAccount: true
                }
            );

            expect(result.success).toBe(true);
            expect(mockAirdropMultiple).toHaveBeenCalledWith({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                recipients: mockRecipients,
                config: expect.objectContaining({
                    enableLogging: true,
                    createRecipientAccount: true
                })
            });
        });

        test('should airdrop to single address', async () => {
            const mockAirdropToAddress = require('../../okito/airdrop/airdrop').airdropTokenToAddress;
            mockAirdropToAddress.mockResolvedValue({
                success: true,
                transactionId: 'mock-single-airdrop-tx',
                recipientsProcessed: 1
            });

            const recipientAddress = createTestWallet().publicKey.toString();
            const result = await okito.airdrop.toAddress(
                TEST_CONFIG.USDC_MINT,
                recipientAddress,
                1000000,
                {
                    enableLogging: true
                }
            );

            expect(result.success).toBe(true);
            expect(mockAirdropToAddress).toHaveBeenCalledWith({
                connection,
                wallet,
                mint: TEST_CONFIG.USDC_MINT,
                recipients: [{ address: recipientAddress, amount: 1000000 }],
                config: expect.objectContaining({
                    enableLogging: true
                })
            });
        });

                 test('should batch airdrop tokens', async () => {
             const mockAirdropBatch = require('../../okito/airdrop/airdrop').airdropTokensBatch;
             mockAirdropBatch.mockResolvedValue([
                 { success: true, transactionId: 'batch-tx-1' },
                 { success: true, transactionId: 'batch-tx-2' }
             ]);

             const result = await okito.airdrop.batch(
                 TEST_CONFIG.USDC_MINT,
                 mockRecipients,
                 {
                     enableLogging: true
                 } as any // Use 'as any' since batch config has additional properties
             );

             expect(Array.isArray(result)).toBe(true);
             expect(result).toHaveLength(2);
             expect(mockAirdropBatch).toHaveBeenCalledWith(
                 connection,
                 wallet,
                 TEST_CONFIG.USDC_MINT,
                 mockRecipients,
                 expect.objectContaining({
                     enableLogging: true
                 })
             );
         });
    });

    describe('NFT Operations', () => {
        const mockNFTData = {
            name: 'Test NFT',
            symbol: 'TNFT',
            imageUrl: 'https://example.com/nft.png',
            description: 'Test NFT description',
            attributes: [
                { trait_type: 'Color', value: 'Blue' },
                { trait_type: 'Rarity', value: 'Rare' }
            ]
        };

        test('should create single NFT', async () => {
            const mockCreateNFT = require('../../okito/NFT/create').createNFT;
            mockCreateNFT.mockResolvedValue({
                success: true,
                mintAddress: 'nft-mint-address',
                transactionId: 'nft-creation-tx'
            });

            const result = await okito.nft.create(mockNFTData, {
                enableLogging: true,
                enableFreezeAuthority: true
            });

            expect(result.success).toBe(true);
            expect(mockCreateNFT).toHaveBeenCalledWith(
                wallet,
                connection,
                mockNFTData,
                expect.objectContaining({
                    enableLogging: true,
                    enableFreezeAuthority: true
                })
            );
        });

        test('should create NFT batch', async () => {
            const mockCreateNFTBatch = require('../../okito/NFT/create').createNFTBatch;
            mockCreateNFTBatch.mockResolvedValue([
                { success: true, mintAddress: 'nft-1', transactionId: 'tx-1' },
                { success: true, mintAddress: 'nft-2', transactionId: 'tx-2' },
                { success: true, mintAddress: 'nft-3', transactionId: 'tx-3' }
            ]);

            const nftArray = [mockNFTData, mockNFTData, mockNFTData];
            const result = await okito.nft.createBatch(nftArray, {
                enableLogging: true
            });

            expect(Array.isArray(result)).toBe(true);
            expect(result).toHaveLength(3);
            expect(mockCreateNFTBatch).toHaveBeenCalledWith(
                wallet,
                connection,
                nftArray,
                expect.objectContaining({
                    enableLogging: true
                })
            );
        });
    });

    describe('SOL Operations', () => {
        test('should wrap SOL to wSOL', async () => {
            const mockWrapSol = require('../../okito/SOL/wrap').wrapSol;
            mockWrapSol.mockResolvedValue({
                success: true,
                transactionId: 'wrap-sol-tx',
                tokenAccount: 'wsol-token-account',
                createdTokenAccount: true
            });

            const result = await okito.sol.wrap({
                amount: 1, // 1 SOL
                config: {
                    enableLogging: true,
                    createAccountIfNeeded: true
                }
            });

            expect(result.success).toBe(true);
            expect(mockWrapSol).toHaveBeenCalledWith({
                connection,
                wallet,
                amountSol: 1,
                config: expect.objectContaining({
                    enableLogging: true,
                    createAccountIfNeeded: true
                })
            });
        });
    });

    describe('Utility Methods', () => {
        test('should update wallet instance', () => {
            const newWallet = createTestWallet();
            const originalWallet = okito.getWallet();

            okito.updateWallet(newWallet);

            expect(okito.getWallet()).toBe(newWallet);
            expect(okito.getWallet()).not.toBe(originalWallet);
        });

        test('should update connection instance', () => {
            const newConnection = createTestConnection();
            const originalConnection = okito.getConnection();

            okito.updateConnection(newConnection);

            expect(okito.getConnection()).toBe(newConnection);
            expect(okito.getConnection()).not.toBe(originalConnection);
        });

        test('should provide access to underlying instances', () => {
            const retrievedConnection = okito.getConnection();
            const retrievedWallet = okito.getWallet();
            const retrievedConfig = okito.getConfig();

            expect(retrievedConnection).toBe(connection);
            expect(retrievedWallet).toBe(wallet);
            expect(retrievedConfig).toBeDefined();
            expect(retrievedConfig.network).toBe('devnet');
        });
    });

    describe('Integration Workflows', () => {
        test('should handle complete DeFi workflow using class API', async () => {
            // Mock all required functions
            const mockTransferTokens = require('../../okito/token/transfer-token').transferTokens;
            const mockBurnToken = require('../../okito/token/burn-token').burnToken;
            
            mockTransferTokens.mockResolvedValue(mockTransactionSuccess);
            mockBurnToken.mockResolvedValue(mockTransactionSuccess);

            // 1. Check token supply and balance
            const supply = await okito.tokens.getSupply(TEST_CONFIG.USDC_MINT);
            const balance = await okito.account.getBalance(TEST_CONFIG.USDC_MINT);
            
            expect(supply.success).toBe(true);
            expect(balance.success).toBe(true);

            // 2. Transfer tokens
            const transferResult = await okito.tokens.transfer({
                mint: TEST_CONFIG.USDC_MINT,
                destination: createTestWallet().publicKey.toString(),
                amount: BigInt(5000000),
                config: { enableLogging: false }
            });
            expect(transferResult.success).toBe(true);

            // 3. Burn some tokens
            const burnResult = await okito.tokens.burn({
                mint: TEST_CONFIG.USDC_MINT,
                amount: 100000,
                config: { enableLogging: false }
            });
            expect(burnResult.success).toBe(true);

            // 4. Check transaction history
            const history = await okito.account.getTransactionHistory({ limit: 10 });
            expect(history.success).toBe(true);
        });

        test('should handle payment workflow using class API', async () => {
            const mockPay = require('../../okito/payment/pay').pay;
            mockPay.mockResolvedValue('payment-workflow-tx');

            // 1. Check balance before payment
            const initialBalance = await okito.account.getBalance(TEST_CONFIG.USDC_MINT);
            expect(initialBalance.success).toBe(true);

            // 2. Make payment - much cleaner API!
            const paymentResult = await okito.payments.pay(15.99, 'USDC');
            expect(paymentResult).toBe('payment-workflow-tx');

            // 3. Verify payment was processed with correct parameters
            expect(mockPay).toHaveBeenCalledWith(
                connection,
                wallet,
                15.99,
                'USDC',
                okito.getConfig()
            );
        });

        test('should demonstrate clean API compared to functional approach', async () => {
            // This test shows how much cleaner the class API is
            
            // Class API (what we test here)
            const classSupply = await okito.tokens.getSupply(TEST_CONFIG.USDC_MINT);
            const classBalance = await okito.account.getBalance(TEST_CONFIG.USDC_MINT);
            
            // Both calls use the same connection and wallet automatically
            expect(classSupply.success).toBe(true);
            expect(classBalance.success).toBe(true);
            
            // No need to pass connection and wallet repeatedly
            // No need to import multiple functions
            // Clear namespace organization
            // Type safety maintained
        });
    });

    describe('Error Handling', () => {
        test('should handle errors gracefully in class methods', async () => {
            // Test wallet disconnection
            const disconnectedWallet = createTestWallet();
            // @ts-ignore - intentionally setting to null for test
            disconnectedWallet.publicKey = null;

            okito.updateWallet(disconnectedWallet);

            const balanceResult = await okito.account.getBalance(TEST_CONFIG.USDC_MINT);
            expect(balanceResult.success).toBe(false);
            expect(balanceResult.error).toBe('Wallet not connected');
        });

        test('should handle invalid token addresses consistently across all operations', async () => {
            const invalidMint = 'invalid-mint-address';

            const [supplyResult, balanceResult] = await Promise.all([
                okito.tokens.getSupply(invalidMint),
                okito.account.getBalance(invalidMint)
            ]);

            expect(supplyResult.success).toBe(false);
            expect(balanceResult.success).toBe(false);
        });
    });
}); 