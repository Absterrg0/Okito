/**
 * Fee estimation for airdrop operations
 */
export interface AirdropFeeEstimation {
    estimatedFee: number;
    breakdown: {
        transfers: number;
        accountCreations: number;
        priorityFee: number;
    };
}
