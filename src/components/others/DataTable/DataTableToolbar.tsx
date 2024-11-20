import { Button, Input } from "@/components/ui";
import { transactionTypeLabels } from "@/data";
import { usePagination } from "@/hooks/use-pagination";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useState } from "react";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const { searchText, setSearchText } = usePagination();
    const [search, setSearch] = useState(searchText);

    const handleSearch = () => {
        setSearchText(search);
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        placeholder="Filter tasks..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                    <Button type="button" size="sm" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
                {table.getColumn("transactionType") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("transactionType")}
                        title="Transaction Type"
                        options={transactionTypeLabels}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
