export type BaseEntity = {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type User = BaseEntity & {
    name: string;
    email: string;
    avatarUrl?: string | null;
};

export type Wallet = BaseEntity & {
    userId: string;
    name?: string;
    bankName?: string;
    accountNumber?: string;
    walletType: string;
    balance: number;
};

export type Category = BaseEntity & {
    userId: string;
    name: string;
    icon?: string;
};

export type Card = BaseEntity & {
    walletId: string;
    cardType: string;
    cardNumber: string;
    expirationDate?: Date;
    cardProvider?: string;
    creditLimit?: number;
    cashbackRate?: number;
    pointsRate?: number;
};

export type Transaction = BaseEntity & {
    userId: string;
    walletId: string;
    categoryId?: string;
    amount: number;
    description?: string;
    transactionType: string;
    recipientAccount?: string;
    refNumber?: string;
    date: string;
};

export type Budget = BaseEntity & {
    userId: string;
    categoryId?: string;
    walletId?: string;
    amount: number;
    startDate?: Date;
    endDate?: Date;
};

export type Notification = BaseEntity & {
    userId: string;
    message: string;
    triggerDate: Date;
};

export type Debt = BaseEntity & {
    userId: string;
    lenderName: string;
    amount: number;
    dueDate?: Date;
    repaid: boolean;
};

export type SavingsPlan = BaseEntity & {
    userId: string;
    goalName: string;
    targetAmount: number;
    currentAmount: number;
    targetDate?: Date;
};

export type Investment = BaseEntity & {
    userId: string;
    assetName: string;
    investedAmount: number;
    currentValue?: number;
    purchaseDate?: Date;
};
