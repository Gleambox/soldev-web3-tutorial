import dotenv from "dotenv";
dotenv.config();

import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const senderKeyPair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`sender wallet address: ${senderKeyPair.publicKey.toBase58()}`)

const toPubkey = new PublicKey("GVB9wNv2frKnJk5n99NcfNTRJ5xyvAzb97Cf6gAHfr5y");

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const LAMPORTS_TO_SEND = 1000000000;

const sendSolIntruction = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND
});

const transaction = new Transaction();

transaction.add(sendSolIntruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeyPair]);

console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}.`
);

console.log(`Transaction signature is ${signature}!`);