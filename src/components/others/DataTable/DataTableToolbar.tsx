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
    const { searchText, setSearchText, setFilter, resetFilters } =
        usePagination();
    const [search, setSearch] = useState(searchText);

    const handleSearch = () => {
        setSearchText(search);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleResetFilters = () => {
        resetFilters();
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <div className="flex w-full max-w-md items-center space-x-2">
                    <Input
                        placeholder="Filter tasks by ref number, description..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyDown={handleKeyDown}
                        className="h-8 w-full"
                    />
                    <Button type="button" size="sm" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
                <DataTableFacetedFilter
                    title="Transaction Type"
                    options={transactionTypeLabels}
                    filterKey="transactionType"
                    setFilter={setFilter}
                />
                <Button
                    variant="ghost"
                    className="h-8 px-2 lg:px-3"
                    onClick={handleResetFilters}
                >
                    Reset
                    <X />
                </Button>
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
