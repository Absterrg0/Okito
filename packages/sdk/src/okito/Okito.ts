import { Connection } from '@solana/web3.js';
import type { SignerWallet } from '../types/custom-wallet-adapter';
import type { OkitoConfig, OkitoResolvedConfig, OkitoNetwork } from '../types/config';
import { validateAndResolveOkitoConfig } from './config';

// Import all the functional methods
import { 
    getTokenBalanceByMint, 
    getTokenBalanceBySymbol 
} from './account/get-balance-for-token';
import { 
    getTransactionHistory, 
    get20Transactions 
} from './account/get-transaction-history';
import { 
    getTokenSupplyByMint, 
    getTokenSupplyBySymbol 
} from './token/getTokenSupply';
import { transferTokens } from './token/transfer-token';
import { burnToken } from './token/burn-token';
import { createNewToken, updateTokenImage } from './token/launch-token';
import { pay } from './payment/pay';
import { 
    airdropTokensToMultiple, 
    airdropTokenToAddress, 
    airdropTokensBatch 
} from './airdrop/airdrop';
import { createNFT, createNFTBatch } from './NFT/create';
import { wrapSol } from './SOL/wrap';

// Import type definitions
import type { TransactionHistoryOptions } from '../types/account/transaction-history';
import type { 
    TransferTokensParams,
    ProductionTransferConfig,
    TransferResult 
} from '../types/token/transfer';
import type { 
    BurnTokenParams,
    BurnTokenConfig,
    BurnTokenResult 
} from '../types/token/burn-token';
import type { 
    TokenLaunchData,
    ProductionTokenLaunchConfig,
    TokenLaunchResult 
} from '../types/token/launch';
import type { 
    AirdropParams,
    AirdropRecipient,
    AirdropConfig,
    AirdropResult 
} from '../types/airdrop/drop';
import type { NFTData, NFTConfig } from '../types/NFT/create';
import type { 
    WrapSolParams,
    WrapSolConfig,
    WrapSolResult 
} from '../types/SOL/wrap';

/**
 * Account-related operations namespace
 */
class AccountOperations {
    constructor(
        private connection: Connection,
        private wallet: SignerWallet
    ) {}

    /**
     * Get token balance by mint address
     */
    async getBalance(mintAddress: string) {
        return getTokenBalanceByMint(this.connection, this.wallet, mintAddress);
    }

    /**
     * Get token balance by symbol
     */
    async getBalanceBySymbol(symbol: string, network: OkitoNetwork) {
        return getTokenBalanceBySymbol(this.connection, this.wallet, symbol, network);
    }

    /**
     * Get transaction history
     */
    async getTransactionHistory(options?: TransactionHistoryOptions) {
        return getTransactionHistory(this.connection, this.wallet, options);
    }

    /**
     * Get last 20 transactions
     */
    async get20Transactions() {
        return get20Transactions(this.connection, this.wallet);
    }
}

/**
 * Token-related operations namespace
 */
class TokenOperations {
    constructor(
        private connection: Connection,
        private wallet: SignerWallet
    ) {}

    /**
     * Get token supply by mint address
     */
    async getSupply(mintAddress: string) {
        return getTokenSupplyByMint(this.connection, mintAddress);
    }

    /**
     * Get token supply by symbol
     */
    async getSupplyBySymbol(symbol: string, network: OkitoNetwork) {
        return getTokenSupplyBySymbol(this.connection, symbol, network);
    }

    /**
     * Transfer tokens
     */
    async transfer(params: {
        mint: string;
        destination: string;
        amount: bigint;
        config?: ProductionTransferConfig;
    }): Promise<TransferResult> {
        return transferTokens({
            connection: this.connection,
            wallet: this.wallet,
            ...params
        });
    }

    /**
     * Burn tokens
     */
    async burn(params: {
        mint: string;
        amount: number;
        config?: BurnTokenConfig;
    }): Promise<BurnTokenResult> {
        return burnToken({
            connection: this.connection,
            wallet: this.wallet,
            mint: params.mint,
            amount: params.amount,
            config: params.config || {}
        });
    }

    /**
     * Create a new token
     */
    async create(
        tokenData: TokenLaunchData, 
        config?: ProductionTokenLaunchConfig
    ): Promise<TokenLaunchResult> {
        return createNewToken({
            wallet: this.wallet,
            connection: this.connection,
            tokenData,
            config
        });
    }

    /**
     * Update token image
     */
    async updateImage(params: {
        mintAddress: string;
        newImageUrl: string;
        config?: ProductionTokenLaunchConfig;
    }): Promise<TokenLaunchResult> {
        return updateTokenImage(
            this.wallet,
            this.connection,
            params.mintAddress,
            params.newImageUrl,
            params.config
        );
    }
}

/**
 * Payment-related operations namespace
 */
class PaymentOperations {
    constructor(
        private connection: Connection,
        private wallet: SignerWallet,
        private config: OkitoResolvedConfig
    ) {}

    /**
     * Make a payment
     */
    async pay(amount: number, token: "USDC" | "USDT"): Promise<string> {
        return pay(this.connection, this.wallet, amount, token, this.config);
    }
}

/**
 * Airdrop-related operations namespace
 */
class AirdropOperations {
    constructor(
        private connection: Connection,
        private wallet: SignerWallet
    ) {}

    /**
     * Airdrop tokens to multiple recipients
     */
    async toMultiple(
        mint: string,
        recipients: AirdropRecipient[],
        config?: AirdropConfig
    ): Promise<AirdropResult> {
        return airdropTokensToMultiple({
            connection: this.connection,
            wallet: this.wallet,
            mint,
            recipients,
            config: config || {}
        });
    }

    /**
     * Airdrop tokens to a single address
     */
    async toAddress(
        mint: string,
        recipient: string,
        amount: number,
        config?: AirdropConfig
    ): Promise<AirdropResult> {
        return airdropTokenToAddress({
            connection: this.connection,
            wallet: this.wallet,
            mint,
            recipients: [{ address: recipient, amount: amount }],
            config: config || {}
        });
    }

    /**
     * Batch airdrop tokens
     */
    async batch(
        mint: string,
        recipients: AirdropRecipient[],
        config?: AirdropConfig
    ): Promise<AirdropResult[]> {
        return airdropTokensBatch(
            this.connection,
            this.wallet,
            mint,
            recipients,
            config || {}
        );
    }
}

/**
 * NFT-related operations namespace
 */
class NFTOperations {
    constructor(
        private connection: Connection,
        private wallet: SignerWallet
    ) {}

    /**
     * Create a single NFT
     */
    async create(nftData: NFTData, config?: NFTConfig): Promise<TokenLaunchResult> {
        return createNFT(this.wallet, this.connection, nftData, config);
    }

    /**
     * Create multiple NFTs in batch
     */
    async createBatch(nftDataArray: NFTData[], config?: NFTConfig): Promise<TokenLaunchResult[]> {
        return createNFTBatch(this.wallet, this.connection, nftDataArray, config);
    }
}

/**
 * SOL-related operations namespace
 */
class SOLOperations {
    constructor(
        private connection: Connection,
        private wallet: SignerWallet
    ) {}

    /**
     * Wrap SOL to wSOL
     */
    async wrap(params: {
        amount: number;
        config?: WrapSolConfig;
    }): Promise<WrapSolResult> {
        return wrapSol({
            connection: this.connection,
            wallet: this.wallet,
            amountSol: params.amount,
            config: params.config || {}
        });
    }
}

/**
 * Main Okito SDK class
 * Provides a clean, object-oriented interface to all SDK functionality
 */
export class Okito {
    public readonly account: AccountOperations;
    public readonly tokens: TokenOperations;
    public readonly payments: PaymentOperations;
    public readonly airdrop: AirdropOperations;
    public readonly nft: NFTOperations;
    public readonly sol: SOLOperations;

    private connection: Connection;
    private wallet: SignerWallet;
    private config: OkitoResolvedConfig;

    /**
     * Create a new Okito SDK instance
     * @param config - Okito configuration object
     * @param wallet - Wallet instance for signing transactions
     * @param connection - Optional custom connection (if not provided, will use config network)
     */
    constructor(
        config: OkitoConfig | OkitoResolvedConfig,
        wallet: SignerWallet,
        connection?: Connection
    ) {
        // Always resolve config to ensure consistent type
        this.config = validateAndResolveOkitoConfig(config as OkitoConfig);
        this.wallet = wallet;
        
        // Use provided connection or create new one from config
        this.connection = connection || new Connection(this.config.rpcUrl, 'confirmed');

        // Initialize operation namespaces
        this.account = new AccountOperations(this.connection, this.wallet);
        this.tokens = new TokenOperations(this.connection, this.wallet);
        this.payments = new PaymentOperations(this.connection, this.wallet, this.config);
        this.airdrop = new AirdropOperations(this.connection, this.wallet);
        this.nft = new NFTOperations(this.connection, this.wallet);
        this.sol = new SOLOperations(this.connection, this.wallet);
    }

    /**
     * Get the underlying connection instance
     */
    getConnection(): Connection {
        return this.connection;
    }

    /**
     * Get the wallet instance
     */
    getWallet(): SignerWallet {
        return this.wallet;
    }

    /**
     * Get the resolved configuration
     */
    getConfig(): OkitoResolvedConfig {
        return this.config;
    }

    /**
     * Update the wallet (useful for wallet switching)
     */
    updateWallet(newWallet: SignerWallet): void {
        this.wallet = newWallet;
        
        // Update all namespace instances
        (this.account as any).wallet = newWallet;
        (this.tokens as any).wallet = newWallet;
        (this.payments as any).wallet = newWallet;
        (this.airdrop as any).wallet = newWallet;
        (this.nft as any).wallet = newWallet;
        (this.sol as any).wallet = newWallet;
    }

    /**
     * Update the connection (useful for network switching)
     */
    updateConnection(newConnection: Connection): void {
        this.connection = newConnection;
        
        // Update all namespace instances
        (this.account as any).connection = newConnection;
        (this.tokens as any).connection = newConnection;
        (this.payments as any).connection = newConnection;
        (this.airdrop as any).connection = newConnection;
        (this.nft as any).connection = newConnection;
        (this.sol as any).connection = newConnection;
    }
}

// Export the main class as default
export default Okito; 