import { Connection } from "@solana/web3.js";
import { getMintAddress } from "../get-mint-address";
import { OkitoNetwork } from "../../types/config";




export default async function getTokenSupply(token: string, network: OkitoNetwork) {
    const connection = new Connection(network, "confirmed");
    const mint = getMintAddress(token, network);
    const supply = await connection.getTokenSupply(mint);
    return supply;
}