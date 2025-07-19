// Core SDK exports
export { validateAndResolveOkitoConfig } from './okito/config';
export { getMintAddress } from './okito/get-mint-address';
export { pay, payWithConfig } from './okito/payment/pay';

// Token launch functionality
export { 
    buildToken, 
    createNewToken, 
    updateTokenImage,
} from './okito/token/launch-token';


export {
    createNFT,
    createNFTBatch,
} from './okito/NFT/create';

// NFT types
export type {
    NFTData,
    NFTConfig
} from './types/NFT/create';

// Token transfer functionality
export {
    transferTokens,
    estimateTokenTransferFee
} from './okito/token/transfer-token';

// Token burn functionality
export {
    burnToken,
    estimateBurnFee
} from './okito/token/burn-token';

// SOL wrapping functionality
export {
    wrapSol
} from './okito/SOL/wrap';

// Airdrop functionality
export {
    airdropTokensToMultiple,
    airdropTokenToAddress,
    airdropTokensBatch
} from './okito/airdrop/airdrop';

export {
    estimateAirdropFee,
    validateAirdropParams,
} from './okito/airdrop/helper';

// Account and balance functions
export {
    getTokenBalance,
    getTokenBalanceBySymbol,
    getBalanceForTokenSafe // Legacy export
} from './okito/account/get-balance-for-token';

export {
    getTransactionHistory,
    getSimpleTransactionHistory,
    getTransactionHistoryByNetwork // Legacy export
} from './okito/account/get-transaction-history';

// Token utility functions
export {
    getTokenSupply,
    getTokenSupplyBySymbol
} from './okito/token/getTokenSupply';

// Helper functions
export {
    validateTokenData,
    validateProductionTokenData,
    estimateTokenCreationFee,
    estimateTransferFee
} from './okito/token/helpers';

// Operation classes for advanced usage
export {
    BurnTokenOperation
} from './okito/token/BurnTokenOperation';

export {
    TransferTokenOperation  
} from './okito/token/TransferTokenOperation';

export {
    WrapSolOperation
} from './okito/SOL/WrapSolOperation';

export {
    AirdropOperation
} from './okito/airdrop/AirdropOperation';

export {
    BaseTokenOperation
} from './okito/core/BaseTokenOperation';

// Type exports
export type { 
    OkitoConfig, 
    OkitoResolvedConfig, 
    OkitoToken, 
    OkitoNetwork 
} from './types/config';    

export type { 
    SignerWallet 
} from './types/custom-wallet-adapter';

export type { 
    PayProps, 
    PayWithCryptoProps,  
} from './types/payment/pay';

export type {
    TransferTokensParams,
    ProductionTransferConfig,
    TransferResult,
    TransferFeeEstimation
} from './types/token/transfer';

export type {
    BurnTokenConfig,
    BurnTokenResult
} from './types/token/burn-token';

// Airdrop types
export type {
    AirdropConfig,
    AirdropRecipient,
    AirdropResult,
    AirdropFeeEstimation
} from './types/airdrop/drop';

// SOL wrapping types
export type {
    WrapSolConfig,
    WrapSolResult,
    WrapSolFeeEstimation
} from './types/SOL/wrap';

// Base operation types
export type {
    BaseOperationConfig,
    BaseOperationResult
} from './okito/core/BaseTokenOperation';

export { 
    TokenLaunchError,
    TokenLaunchErrorCode 
} from './types/errors';

export type{
    TokenLaunchData,
    TokenLaunchResult,
    TokenLaunchProps,
    ProductionTokenLaunchConfig,
    ValidationResult,
    FeeEstimation,
} from './types/token/launch';