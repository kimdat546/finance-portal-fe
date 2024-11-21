import {
    DataTable,
    DataTableColumnHeader,
    DataTableRowActions,
} from "@/components/others/DataTable";
import { FileUploader } from "@/components/others/FileUploader";
import {
    Badge,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui";
import { transactionTypeLabels } from "@/data";
import { usePagination } from "@/hooks/use-pagination";
import { splitIntoBatches } from "@/lib/utils";
import {
    fetchTransactions,
    uploadTransactions,
} from "@/services/transactionService";
import { fetchMyWallets } from "@/services/walletService";
import { Transaction } from "@/types";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import { toast } from "sonner";

const headerKeywords = {
    date: "Ngày giá trị\nValue Date",
    refNumber: "Số giao dịch\nReference Number",
    description: "Diễn giải\nExplanation",
    debit: "Nợ\nDebit",
    credit: "Có\nCredit",
    balance: "Số dư\nBalance",
};

const columns: ColumnDef<Transaction>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
    },
    {
        accessorKey: "refNumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Reference Number" />
        ),
        cell: ({ row }) => (
            <div className="w-[150px]">{row.getValue("refNumber")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "amount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => (
            <div className="w-[150px]">
                {(row.getValue("amount") as number).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                })}
            </div>
        ),
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => (
            <div className="w-[300px]">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "transactionType",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Transaction Type" />
        ),
        cell: ({ row }) => {
            const label = transactionTypeLabels.find(
                (label) => label.value === row.original.transactionType
            );

            return label && <Badge variant="outline">{label.label}</Badge>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];

const processFile = async (
    file: File | Blob | ArrayBuffer,
    walletId: string,
    uploadTransactions: {
        mutateAsync: (arg0: { transactions: Transaction[] }) => any;
    }
) => {
    readXlsxFile(file).then(async (rows) => {
        // Function to find the header row index
        const findHeaderRow = (data: any[], keywords: any[]) => {
            return data.findIndex((row) =>
                row.some((cell: string | any[]) =>
                    keywords.some(
                        (keyword) =>
                            typeof cell === "string" && cell.includes(keyword)
                    )
                )
            );
        };

        // Find the header row index
        const { balance, ...filteredHeaderKeywords } = headerKeywords;
        const headerRowIndex = findHeaderRow(
            rows,
            Object.values(filteredHeaderKeywords).flat()
        );

        if (headerRowIndex !== -1) {
            // Extract data starting from the header row
            const headers = rows[headerRowIndex];
            const dataRows = rows.slice(headerRowIndex + 1);

            // Create a column mapping based on the headers
            const columnMapping: { [key: string]: number } = {};
            headers.forEach((header, index) => {
                for (const [key, values] of Object.entries(headerKeywords)) {
                    if (typeof header === "string" && values.includes(header)) {
                        columnMapping[key] = index;
                        break;
                    }
                }
            });

            // Map data to the required format
            const transactions = dataRows
                .map((row) => {
                    return {
                        walletId,
                        date: row[columnMapping.date]
                            ? new Date(row[columnMapping.date] as any)
                            : new Date(),
                        refNumber: row[columnMapping.refNumber]
                            ? String(row[columnMapping.refNumber])
                            : "",
                        amount: row[columnMapping.debit]
                            ? Number(row[columnMapping.debit])
                            : Number(row[columnMapping.credit]),
                        description: row[columnMapping.description]
                            ? String(row[columnMapping.description])
                            : "",
                        transactionType: row[columnMapping.debit]
                            ? "EXPENSE"
                            : "INCOME",
                        balance: row[columnMapping.balance]
                            ? Number(row[columnMapping.balance])
                            : 0,
                    };
                })
                .filter((transaction) => transaction.refNumber !== "");

            // Split transactions into batches
            const batchSize = 100; // Adjust the batch size as needed
            const batches = splitIntoBatches(transactions, batchSize);

            // Upload each batch to the backend
            for (const batch of batches) {
                try {
                    await uploadTransactions.mutateAsync({
                        transactions: batch,
                    });
                } catch (error) {
                    toast.error("Batch upload failed", {
                        description:
                            (error as any).message || "An error occurred",
                    });
                }
            }
            toast.success("Upload successful.");
        } else {
            toast.error("Header row not found.");
        }
    });
};

const page = () => {
    const [files, setFiles] = useState<File[]>([]);
    const uploadTransactionsMutation = useMutation({
        mutationFn: uploadTransactions,
    });
    const { page, pageSize, setPage, setPageSize, searchText, filters } =
        usePagination();

    const { data } = useQuery({
        queryKey: ["transactions", page, pageSize, searchText, filters],
        queryFn: () => fetchTransactions(page, pageSize, searchText, filters),
        placeholderData: keepPreviousData,
    });

    const { data: myWallets } = useQuery({
        queryKey: ["my-wallets"],
        queryFn: () => fetchMyWallets(),
    });

    useEffect(() => {
        if (!myWallets) return;
        if (files.length === 0) return;
        const file = files[0];
        if (file && myWallets?.[0]?.id) {
            processFile(file, myWallets[0].id, uploadTransactionsMutation);
        }
    }, [files]);

    return (
        <div className="h-full flex-1 flex-col space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Welcome back!
                    </h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of your tasks for this month!
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            Upload files{" "}
                            {files.length > 0 && `(${files.length})`}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle>Upload files</DialogTitle>
                            <DialogDescription>
                                Drag and drop your files here or click to
                                browse.
                            </DialogDescription>
                        </DialogHeader>
                        <FileUploader
                            maxFileCount={1}
                            maxSize={1 * 1024 * 1024}
                            onValueChange={setFiles}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable
                data={data?.data || []}
                columns={columns}
                totalItems={data?.total || 0}
                pageIndex={page}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
            />
        </div>
    );
};

export default page;
