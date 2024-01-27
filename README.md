# Restaurant Review on Solana
This is the final project for the in rise solana bootcamp

👉 Visit the [**LIVE WEBSITE**](https://solana-bootcamp-final-project.vercel.app/)

## Overview
This solana dapp provides gives user the opportunity to publish their restaurant reviews on the solana blockchain.
They can share and update their reviews and see other users reviews.

## Features
- See all reviews
- create your own reviews
- update your reviews
- beautiful design

## Getting Started
Follow these steps to set up the project locally.
Alternativly check out the deployed version [**here**](https://solana-bootcamp-final-project.vercel.app/)

### Prerequisites
1. Node.js: Ensure Node.js is installed. Download it from [nodejs.org](https://nodejs.org/en).

2. Make sure you have a solana wallet installed in your browser

### Installation
1. Clone the repo
````
git clone https://github.com/quinn-eschenbach/solana-bootcamp-final-project
````
2. Install the npm packages
```
npm install
```
3. Navigate to [https://beta.solpg.io/](https://beta.solpg.io/)
4. Upload the rust files from the /program folder
5. Connect your wallet to devnet on the bottom left
6. Fund the wallets you want to use for testing using the [faucet](https://faucet.solana.com/) or `solana airdrop 1` in the solpg playground
7. Build and deploy
8. Copy the "Program ID" and replace the `REVIEW_PROGRAM_ID` in `/src/programmId.tsx` with it

### Usage
1. Start development server
```
npm run dev
```
2. Open `http://localhost:3000` in your browser
3. Connect your solana wallet
4. Start writing your reviews

### Frontend
This dapp is build using nextjs. It provides a beautiful, responsive, blazingly fast and food themed UI to interact with the program.

Technologies used:
- **NextJS**: Next 14 and the app router proivde a smooth user experience
- **Shadcn/ui** is used for beautiful and accessible components
- **useSwr** used for data fetching
- **@solana** to interact with the solana blockchain
