import {
    Connection,
    PublicKey,
    TransactionInstruction,
    TransactionMessage,
    VersionedTransaction,
  } from "@solana/web3.js";
  import {
    TOKEN_PROGRAM_ID,
    TOKEN_2022_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    createTransferInstruction,
    getAssociatedTokenAddress,
    getMint,
  } from "@solana/spl-token";
  import { SignerWallet } from "@okito/sdk";
  import { getMintAddress } from "@okito/sdk";
  
  // createMemoInstruction remains the same...
  function createMemoInstruction(memo: string): TransactionInstruction {
      const MEMO_PROGRAM_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");
      return new TransactionInstruction({
        keys: [],
        programId: MEMO_PROGRAM_ID,
        data: Buffer.from(memo, 'utf8'),
      });
  }
  
  
  export async function pay(
    connection: Connection,
    wallet: SignerWallet,
    amount: number,
    token: "USDC" | "USDT",
    destinationAddress: string,
    sessionId: string,
    network: "mainnet-beta" | "devnet" = "devnet"
  ): Promise<string> {
    if (!wallet?.publicKey || !wallet.signTransaction) {
      throw new Error("Wallet not connected");
    }
  
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error("Amount must be a positive number");
    }
  
    const mint = getMintAddress(token, network);
    const destinationPubkey = new PublicKey(destinationAddress);
    
    // Get mint info to determine the correct program ID and decimals
    let mintInfo;
    let tokenProgramId = TOKEN_PROGRAM_ID;
    console.log(mint);
    
    try {
      mintInfo = await getMint(connection, mint, 'confirmed', TOKEN_2022_PROGRAM_ID);
      tokenProgramId = TOKEN_2022_PROGRAM_ID;
    } catch {
      try {
        mintInfo = await getMint(connection, mint, 'confirmed', TOKEN_PROGRAM_ID);
        tokenProgramId = TOKEN_PROGRAM_ID;
      } catch {
        throw new Error(`Unable to fetch mint info for ${token}`);
      }
    }
    
    const decimals = mintInfo.decimals;
    const rawAmount = BigInt(Math.floor(amount * Math.pow(10, decimals)));
  
    // 1. Get the addresses for the token accounts using the correct program ID
    const sourceTokenAccountAddress = await getAssociatedTokenAddress(
      mint,
      wallet.publicKey,
      false,
      tokenProgramId
    );
    const destinationTokenAccountAddress = await getAssociatedTokenAddress(
      mint,
      destinationPubkey,
      false,
      tokenProgramId
    );
  
    // 2. Check if the destination ATA exists
    const destinationAccountInfo = await connection.getAccountInfo(destinationTokenAccountAddress);
  
    // Build instructions array
    const instructions: TransactionInstruction[] = [];
  
    // Add memo instruction
    instructions.push(createMemoInstruction(JSON.stringify({
      sessionId,
      amount: amount.toString(),
      token,
      timestamp: Date.now(),
    })));
  
    // 3. If destination ATA doesn't exist, add an instruction to create it
    if (destinationAccountInfo === null) {
      instructions.push(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey, // Payer of the transaction fee
          destinationTokenAccountAddress, // The new ATA address
          destinationPubkey, // Owner of the new ATA
          mint, // The token mint
          tokenProgramId // Use the detected program ID
        )
      );
    }
  
    // 4. Add the transfer instruction (always uses the calculated addresses)
    instructions.push(
      createTransferInstruction(
        sourceTokenAccountAddress,
        destinationTokenAccountAddress,
        wallet.publicKey,
        rawAmount,
        [],
        tokenProgramId // Use the detected program ID
      )
    );
  
    // --- Transaction creation, signing, and sending remains the same ---
  
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    
    const messageV0 = new TransactionMessage({
      payerKey: wallet.publicKey,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message();
    
    const transaction = new VersionedTransaction(messageV0);
    const signedTransaction = await wallet.signTransaction(transaction);
    const signature = await connection.sendTransaction(signedTransaction);
  
    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    }, 'confirmed');
  
    return signature;
  }