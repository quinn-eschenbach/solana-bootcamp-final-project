"use client";

import dynamic from "next/dynamic";
import { FC } from "react";
// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export const WalletButton: FC = () => {
  return (
    <div className="rounded h-12">
      <WalletMultiButton
        style={{
          backgroundColor: "#000",
        }}
      />
    </div>
  );
};
