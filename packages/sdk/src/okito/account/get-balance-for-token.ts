import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { SignerWallet } from "../../types/custom-wallet-adapter";
import { OkitoNetwork } from "../../types/config";
import { getMintAddress } from "../get-mint-address";


// Alternative version with better error handling
export async function getBalanceForTokenSafe(
    wallet: SignerWallet, 
    token: string, 
    network: OkitoNetwork
) {
    if (!wallet.publicKey) {
        return {
            success: false,
            error: 'Wallet not connected',
            balance: null
        };
    }

    try {
        const connection = new Connection(network, "confirmed");
        const mintAddress = getMintAddress(token, network);
        const mintPubkey = new PublicKey(mintAddress);
        
        // Get the Associated Token Account address
        const tokenAccountAddress = await getAssociatedTokenAddress(
            mintPubkey,
            wallet.publicKey
        );
        
        // Check if the token account exists first
        const accountInfo = await connection.getAccountInfo(tokenAccountAddress);
        
        if (!accountInfo) {
            // Token account doesn't exist, balance is 0
            return {
                success: true,
                balance: {
                    value: {
                        amount: "0",
                        decimals: 0,
                        uiAmount: 0,
                        uiAmountString: "0"
                    }
                }
            };
        }
        
        // Get the actual balance
        const balance = await connection.getTokenAccountBalance(tokenAccountAddress);
        
        return {
            success: true,
            balance
        };
        
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Failed to fetch token balance',
            balance: null
        };
    }
}