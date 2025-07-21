import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { PublicKey } from '@solana/web3.js';
import { getTokenSupplyByMint, getTokenSupplyBySymbol } from '../../okito/token/getTokenSupply';
import { 
    createTestConnection, 
    TEST_CONFIG, 
    withTimeout,
    MockConnection 
} from '../setup';

describe('Token Supply Functions', () => {
    let connection: MockConnection;

    beforeEach(() => {
        connection = createTestConnection();
        process.env.NODE_ENV = 'test';
    });

    describe('getTokenSupply', () => {
        test('should return token supply for valid mint address', async () => {
            const result = await withTimeout(
                getTokenSupplyByMint(connection, TEST_CONFIG.USDC_MINT)
            );
            console.log(result);

            expect(result.success).toBe(true);
            expect(result.supply).toBeDefined();
            expect(result.supply?.amount).toBe('1000000000000');
            expect(result.supply?.decimals).toBe(6);
            expect(result.supply?.uiAmount).toBe(1000000);
            expect(result.supply?.uiAmountString).toBe('1000000');
            expect(result.error).toBeUndefined();
        });

        test('should handle invalid mint address', async () => {
            const invalidMint = 'invalid-mint-address';
            
            const result = await withTimeout(
                getTokenSupplyByMint(connection, invalidMint)
            );

            expect(result.success).toBe(false);
            expect(result.supply).toBeNull();
            expect(result.error).toBeDefined();
            expect(typeof result.error).toBe('string');
        });

        test('should handle empty mint address', async () => {
            const result = await withTimeout(
                getTokenSupplyByMint(connection, '')
            );

            expect(result.success).toBe(false);
            expect(result.supply).toBeNull();
            expect(result.error).toBeDefined();
        });

        test('should handle connection errors', async () => {
            // Mock connection error
            const errorConnection = createTestConnection();
            jest.spyOn(errorConnection, 'getAccountInfo').mockRejectedValue(
                new Error('Connection failed')
            );

            const result = await withTimeout(
                getTokenSupplyByMint(errorConnection, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(false);
            expect(result.supply).toBeNull();
            expect(result.error).toContain('Connection failed');
        });

        test('should calculate UI amount correctly', async () => {
            const result = await withTimeout(
                getTokenSupplyByMint(connection, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            if (result.supply) {
                const expectedUiAmount = Number(result.supply.amount) / Math.pow(10, result.supply.decimals);
                expect(result.supply.uiAmount).toBe(expectedUiAmount);
                expect(result.supply.uiAmountString).toBe(expectedUiAmount.toString());
            }
        });
    });

    describe('getTokenSupplyBySymbol', () => {
        test('should return token supply for USDC symbol', async () => {
            const result = await withTimeout(
                getTokenSupplyBySymbol(connection, 'USDC', TEST_CONFIG.NETWORK)
            );

            expect(result.success).toBe(true);
            expect(result.supply).toBeDefined();
            expect(result.supply?.decimals).toBe(6);
            expect(result.error).toBeUndefined();
        });

        test('should return token supply for USDT symbol', async () => {
            const result = await withTimeout(
                getTokenSupplyBySymbol(connection, 'USDT', TEST_CONFIG.NETWORK)
            );

            expect(result.success).toBe(true);
            expect(result.supply).toBeDefined();
            expect(result.error).toBeUndefined();
        });

        test('should handle invalid token symbol', async () => {
            const result = await withTimeout(
                getTokenSupplyBySymbol(connection, 'INVALID_TOKEN', TEST_CONFIG.NETWORK)
            );

            expect(result.success).toBe(false);
            expect(result.supply).toBeNull();
            expect(result.error).toBeDefined();
        });

        test('should handle invalid network', async () => {
            const result = await withTimeout(
                getTokenSupplyBySymbol(connection, 'USDC', 'invalid-network')
            );

            expect(result.success).toBe(false);
            expect(result.supply).toBeNull();
            expect(result.error).toBeDefined();
        });

        test('should handle getMintAddress import errors', async () => {
            // This test simulates when getMintAddress function fails
            const result = await withTimeout(
                getTokenSupplyBySymbol(connection, 'USDC', '')
            );

            expect(result.success).toBe(false);
            expect(result.supply).toBeNull();
            expect(result.error).toBeDefined();
        });
    });

    describe('Edge Cases', () => {
        test('should handle very large supply amounts', async () => {
            // Mock a very large supply
            const largeSupplyConnection = createTestConnection();
            
            // Create proper mint account data with large supply
            const mintAccountData = Buffer.alloc(82);
            mintAccountData.writeUInt32LE(1, 0); // mintAuthorityOption
            new PublicKey(TEST_CONFIG.USDC_MINT).toBuffer().copy(mintAccountData, 4);
            mintAccountData.writeBigUInt64LE(BigInt('999999999999999999'), 36); // large supply (18 digits)
            mintAccountData.writeUInt8(9, 44); // decimals
            mintAccountData.writeUInt8(1, 45); // isInitialized
            mintAccountData.writeUInt32LE(1, 46); // freezeAuthorityOption
            new PublicKey(TEST_CONFIG.USDC_MINT).toBuffer().copy(mintAccountData, 50);
            
            jest.spyOn(largeSupplyConnection, 'getAccountInfo').mockResolvedValue({
                owner: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                lamports: 1461600,
                data: mintAccountData,
                executable: false,
                rentEpoch: 361
            });

            const result = await withTimeout(
                getTokenSupplyByMint(largeSupplyConnection, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.supply?.amount).toBe('999999999999999999');
        });

        test('should handle zero supply', async () => {
            const zeroSupplyConnection = createTestConnection();
            
            // Create proper mint account data with zero supply
            const mintAccountData = Buffer.alloc(82);
            mintAccountData.writeUInt32LE(1, 0); // mintAuthorityOption
            new PublicKey(TEST_CONFIG.USDC_MINT).toBuffer().copy(mintAccountData, 4);
            mintAccountData.writeBigUInt64LE(BigInt('0'), 36); // zero supply
            mintAccountData.writeUInt8(6, 44); // decimals
            mintAccountData.writeUInt8(1, 45); // isInitialized
            mintAccountData.writeUInt32LE(1, 46); // freezeAuthorityOption
            new PublicKey(TEST_CONFIG.USDC_MINT).toBuffer().copy(mintAccountData, 50);
            
            jest.spyOn(zeroSupplyConnection, 'getAccountInfo').mockResolvedValue({
                owner: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                lamports: 1461600,
                data: mintAccountData,
                executable: false,
                rentEpoch: 361
            });

            const result = await withTimeout(
                getTokenSupplyByMint(zeroSupplyConnection, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.supply?.amount).toBe('0');
            expect(result.supply?.uiAmount).toBe(0);
        });

        test('should handle different decimal precisions', async () => {
            const customDecimalConnection = createTestConnection();
            
            // Create proper mint account data with 9 decimals
            const mintAccountData = Buffer.alloc(82);
            mintAccountData.writeUInt32LE(1, 0); // mintAuthorityOption
            new PublicKey(TEST_CONFIG.USDC_MINT).toBuffer().copy(mintAccountData, 4);
            mintAccountData.writeBigUInt64LE(BigInt('1000000000'), 36); // supply: 1 token with 9 decimals
            mintAccountData.writeUInt8(9, 44); // decimals: 9
            mintAccountData.writeUInt8(1, 45); // isInitialized
            mintAccountData.writeUInt32LE(1, 46); // freezeAuthorityOption
            new PublicKey(TEST_CONFIG.USDC_MINT).toBuffer().copy(mintAccountData, 50);
            
            jest.spyOn(customDecimalConnection, 'getAccountInfo').mockResolvedValue({
                owner: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                lamports: 1461600,
                data: mintAccountData,
                executable: false,
                rentEpoch: 361
            });

            const result = await withTimeout(
                getTokenSupplyByMint(customDecimalConnection, TEST_CONFIG.USDC_MINT)
            );

            expect(result.success).toBe(true);
            expect(result.supply?.decimals).toBe(9);
            expect(result.supply?.uiAmount).toBe(1);
        });
    });

    describe('Performance', () => {
        test('should complete within reasonable time', async () => {
            const startTime = Date.now();
            
            await withTimeout(
                getTokenSupplyByMint(connection, TEST_CONFIG.USDC_MINT),
                5000
            );
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(5000);
        });

        test('should handle concurrent requests', async () => {
            const promises = Array.from({ length: 5 }, () =>
                getTokenSupplyByMint(connection, TEST_CONFIG.USDC_MINT)
            );

            const results = await Promise.all(promises);

            results.forEach(result => {
                expect(result.success).toBe(true);
                expect(result.supply).toBeDefined();
            });
        });
    });
}); 