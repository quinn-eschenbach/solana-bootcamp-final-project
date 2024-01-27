import * as web3 from "@solana/web3.js";
import { Review } from "@/models/Review";

export const fetchReviews = async (
  REVIEW_PROGRAM_ID: string,
  connection: web3.Connection
) => {
  let account_list: web3.PublicKey[] = [];

  const accounts = await connection.getProgramAccounts(
    new web3.PublicKey(REVIEW_PROGRAM_ID),
    {
      dataSlice: { offset: 2, length: 18 },
      filters: [],
    }
  );
  account_list = accounts.map((account) => account.pubkey);

  const keys = await connection.getMultipleAccountsInfo(account_list);

  const reviews = keys.reduce((accum: Review[], account) => {
    const rew = Review.deserialize(account?.data);
    if (!rew) {
      return accum;
    }

    return [...accum, rew];
  }, []);

  return reviews;
};

export const fetchReview = async (
  REVIEW_PROGRAM_ID: string,
  connection: web3.Connection,
  publicKey: web3.PublicKey,
  title: string
) => {
  const [pda] = web3.PublicKey.findProgramAddressSync(
    [publicKey.toBuffer(), Buffer.from(title)],
    new web3.PublicKey(REVIEW_PROGRAM_ID)
  );

  const info = await connection.getAccountInfo(pda);

  if (info === null) {
    return "not found";
  }

  return Review.deserialize(info.data);
};
