import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next";
import WalletContextProvider from "@/components/WalletContextProvider";

import { cn } from "@/lib/utils";
import Link from "next/link";
import dynamic from "next/dynamic";
import { WalletButton } from "../components/WalletButton";
import { Toaster } from "sonner";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Solana Reviews",
  description: "Welcome to Next.js",
};

// const Toaster = dynamic(
//   async () => (await import("@/components/ui/sonner")).Toaster
// );

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🍔</text></svg>"
        />
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        style={{
          backgroundImage: "url('/i-like-food.svg')",
        }}
      >
        <WalletContextProvider>
          <nav className={"border-b border-border p-2 bg-background"}>
            <ul className="flex gap-8 max-w-5xl mx-auto px-8 items-center flex-wrap">
              <Link href={"/"}>
                <li className="text-sm">Home</li>
              </Link>
              <Link className="mr-auto" href={"/create"}>
                <li className="text-sm">New Review</li>
              </Link>
              <div className="">
                <WalletButton />
              </div>
            </ul>
          </nav>
          <div className={"max-w-5xl mx-auto px-8 pt-4"}>{children}</div>
          <Toaster />
        </WalletContextProvider>
      </body>
    </html>
  );
}
