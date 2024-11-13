import { Wallet } from "./entities";

export type GroupWallet = {
    label: string;
    wallets: Wallet[];
};
