"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Crosshair, X } from "react-feather"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { categories } from "../data"


interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtar nombres..."
          value={(table.getColumn("names")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("names")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("categoria") && (
          <DataTableFacetedFilter
            column={table.getColumn("categoria")}
            title="Categoria"
            options={categories}
          />
        )}
        {table.getColumn("condition") && (
          <DataTableFacetedFilter
            column={table.getColumn("condition")}
            title="Condición"
            options={[
              {
                label: 'Victoria',
                value: 'victory',
                // icon: Flag
              },
              {
                  label: 'Derrota',
                  value: 'defeat',
                  // icon: Flag
              },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}