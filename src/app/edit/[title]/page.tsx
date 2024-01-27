"use client";
import ReviewForm, { ReviewSchemaType } from "@/components/ReviewForm";
import { Review, UPDATE_REVIEW } from "@/models/Review";
import { REVIEW_PROGRAM_ID } from "@/programmId";
import { fetchReview } from "@/util/fetchReviews";
import { useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import Link from "next/link";
import { toast } from "sonner";
import useSWR from "swr";

export default function UpdatePage({ params }: { params: { title: string } }) {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const { publicKey, sendTransaction } = useWallet();

  const { data, error, isLoading } = useSWR(
    publicKey ? params.title : null,
    publicKey
      ? async () =>
          fetchReview(
            REVIEW_PROGRAM_ID,
            connection,
            publicKey,
            decodeURI(params.title)
          )
      : null
  );

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

    const buffer = review.serialize(UPDATE_REVIEW);
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

  if (error) {
    return <div>Error</div>;
  }

  if (!data || isLoading) {
    return <div>Loading</div>;
  }

  if (typeof data === "string") {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow p-8">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-1">
          You cant update this review!
        </h1>
        <p className="text-sm mb-4">
          You are only allowed update reviews you have written
        </p>
        <Link className="underline text-blue-500 text-sm" href={"/"}>
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-8">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
        Update <i>{data.title}</i>
      </h1>
      <ReviewForm initialValues={data} onSubmit={onSubmit} />
    </div>
  );
}
