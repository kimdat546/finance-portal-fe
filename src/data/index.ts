export const chartData = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Jul",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Aug",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Sep",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Oct",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Nov",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: "Dec",
        total: Math.floor(Math.random() * 5000) + 1000,
    },
];

export const groupsWallet = [
    {
        label: "TP Bank",
        wallets: [
            {
                id: "df0c82ff-0a2d-4ab9-b1ca-0ba0ef29e2f0",
                userId: "0773ade6-64d7-4cd9-b7e1-e0c642538603",
                name: "Default account",
                bankName: "TP Bank",
                accountNumber: "02880049001",
                walletType: "bank",
                balance: 5000,
            },
            {
                id: "df0c82ff-0a2d-4ab9-b1ca-0ba0ef29e2f1",
                userId: "0773ade6-64d7-4cd9-b7e1-e0c642538603",
                name: "Savings account",
                bankName: "Vietcombank",
                accountNumber: "02880049002",
                walletType: "bank",
                balance: 10000,
            },
        ],
    },
];

export const transactionTypeLabels = [
    {
        value: "income",
        label: "Income",
    },
    {
        value: "expense",
        label: "Expense",
    },
    {
        value: "transfer",
        label: "Transfer",
    },
];
