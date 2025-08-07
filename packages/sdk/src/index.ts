import burnToken from './okito/token/BurnTokenOperation';

// Core SDK exports
export { getMintAddress } from './okito/get-mint-address';


// // Main Okito class for object-oriented usage
// export { Okito } from './okito/Okito';

// Token launch functionality
export { 
    createNewToken, 
    updateTokenImage,
} from './okito/token/launch-token';


export {
    createNFT,
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

export {burnToken}

// SOL wrapping functionality
export {
    wrapSol
} from './okito/SOL/wrap';

// Airdrop functionality
export {
    airdropTokens
} from './okito/airdrop/airdrop';

export {
    airdropTokensBatch
} from './okito/airdrop/airdrop-batch';

export {
    estimateAirdropFee
} from './okito/airdrop/helper';

// Account and balance functions
export {
    getTokenBalanceBySymbol,
    getTokenBalanceByMint
} from './okito/token/get-balance-for-token';

export {
    getTransactions,  
} from './okito/account/get-transaction-history';

// Token utility functions
export {
    getTokenSupplyBySymbol,
    getTokenSupplyByMint, // Alias for compatibility
} from './okito/token/getTokenSupply';

// Helper functions
export {
    estimateTokenCreationFee,
    estimateTransferFee
} from './okito/token/helpers';


// Type exports
// export type { 
//     OkitoConfig, 
//     OkitoResolvedConfig, 
//     OkitoToken, 
//     OkitoNetwork 
// } from './types/config';    

export type { 
    SignerWallet 
} from './types/custom-wallet-adapter';

// export type { 
//     PayProps, 
//     PayWithCryptoProps,  
// } from './types/payment/pay';

export type {
    //TransferTokensParams,
    TransferConfig,
    TransferResult,
    //TransferFeeEstimation
} from './types/token/transfer';

export type {
    BurnTokenConfig,
    BurnTokenResult
} from './types/token/burn-token';

// Airdrop types
export type {
    AirdropConfig,
    //AirdropRecipient,
    AirdropResult,
    //AirdropFeeEstimation
} from './types/airdrop/drop';

// SOL wrapping types
// export type {
//     WrapSolConfig,
//     WrapSolResult,
//     WrapSolFeeEstimation
// } from './types/SOL/wrap';

// Base operation types
export type {
    OperationConfig,
    OperationResult
} from './types/core';

// export { 
//     TokenLaunchError,
//     TokenLaunchErrorCode 
// } from './types/errors';

export type{
    TokenData,
    TokenResult,
    //FeeEstimation
} from './types/token/launch';
















// EXPERIMENTAL

export { pay } from './okito/payment/pay';