"use client";
import ReviewForm, { ReviewSchemaType } from "@/components/ReviewForm";
import { CREATE_REVIEW, Review } from "@/models/Review";
import { REVIEW_PROGRAM_ID } from "@/programmId";
import { useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { toast } from "sonner";

export default function CreatePage() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const { publicKey, sendTransaction } = useWallet();

  function onSubmit({
    title,
    rating,
    description,
    location,
  }: ReviewSchemaType) {
    const review = new Review(title, rating, description, location);
    handleTransactionSubmit(review);
  }

  async function handleTransactionSubmit(review: Review) {
    if (!publicKey) {
      alert("Connect Wallet");
      return;
    }

    const buffer = review.serialize(CREATE_REVIEW);
    const transcation = new web3.Transaction();

    const [pda] = web3.PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), Buffer.from(review.title)],
      new web3.PublicKey(REVIEW_PROGRAM_ID)
    );

    const instruction = new web3.TransactionInstruction({
      keys: [
        { pubkey: publicKey, isSigner: false, isWritable: false },
        { pubkey: pda, isSigner: false, isWritable: true },
        {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: buffer,
      programId: new web3.PublicKey(REVIEW_PROGRAM_ID),
    });

    transcation.add(instruction);

    try {
      const txId = await sendTransaction(transcation, connection);
      // let txId = await

      toast.success(`Transaction submitted`, {
        action: {
          label: "Track Transaction",
          onClick: () =>
            window
              ?.open(
                `https://explorer.solana.com/tx/${txId}?cluster=devnet`,
                "_blank"
              )
              ?.focus(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-8">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
        Create a new review
      </h1>
      <ReviewForm onSubmit={onSubmit} />
    </div>
  );
}
