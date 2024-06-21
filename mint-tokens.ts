import { mintTo } from "@solana/spl-token";
import dotenv from "dotenv";
dotenv.config();

import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const user = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintAccount = new PublicKey("AoEq1cbHMrTwfUdxx9wV61BN6pVccgAJgWnhRT58FAHq");

const recipientAssociatedTokenAccount = new PublicKey("2WFRMWX1FUc6osz7Pxs92JmsETHRGTgoAnWG6DorpZfF");

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    user,
    100 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);