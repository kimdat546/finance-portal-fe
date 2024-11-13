import { CalendarDateRangePicker } from '@/components/others/CalendarDateRangePicker';
import { Avatar, AvatarFallback, AvatarImage, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Checkbox, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { chartData, transactionTypeLabels } from '@/data';
import { Transaction } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
    DataTable,
    DataTableColumnHeader,
    DataTableRowActions,
} from "@/components/others/DataTable";


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
            <DataTableColumnHeader
                column={column}
                title="Reference Number"
            />
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
                {(row.getValue("amount") as number).toLocaleString(
                    "vi-VN",
                    {
                        style: "currency",
                        currency: "VND",
                    }
                )}
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
            <DataTableColumnHeader
                column={column}
                title="Transaction Type"
            />
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

const page = () => {
    return (
        <div className="h-full flex-1 flex-col space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                    <p className="text-muted-foreground">
                        Here&apos;s a list of your tasks for this month!
                    </p>
                </div>
            </div>
            <DataTable data={data?.transactions} columns={columns} />
        </div>
    );
}

export default page
