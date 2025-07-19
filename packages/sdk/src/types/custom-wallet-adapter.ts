import type {
    Connection,
    PublicKey,
    Transaction,
    VersionedTransaction,
} from '@solana/web3.js';

/**
 * Defines the minimum required properties and methods that any wallet
 * must implement to be compatible with the Okito SDK.
 *
 * This interface allows the SDK to remain UI-framework-agnostic. Any wallet object,
 * whether from @solana/wallet-adapter-react or a server-side Keypair, can be used
 * as long as it "structurally" matches this shape.
 */
export interface SignerWallet {
    /**
     * The public key of the connected wallet. Your SDK needs this to identify
     * the user and set the fee payer.
     */
    publicKey: PublicKey;

    /**
     * Signs a single transaction. This is a core capability required for
     * any operation that needs the user's approval.
     */
    signTransaction<T extends Transaction | VersionedTransaction>(
        transaction: T
    ): Promise<T>;

    /**
     * Signs an array of transactions. Useful for more complex operations
     * that require multiple transactions to be signed in sequence.
     */
    signAllTransactions<T extends Transaction | VersionedTransaction>(
        transactions: T[]
    ): Promise<T[]>;

    /**
     * A convenience method to sign and send a transaction in one step.
     * The wallet object from @solana/wallet-adapter-react provides this,
     * so including it makes the integration seamless for users.
     */
    sendTransaction(
        transaction: Transaction,
        connection: Connection
    ): Promise<string>; // Returns the transaction signature
}
