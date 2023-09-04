"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./components/data-table-column-header"
import { DataTableRowActions } from "./components/data-table-row-actions"
import { Badge } from "@/components/ui/badge"
import { categories } from "./data"

interface Ranking {
  names: string,
  ranking: string,
  categoria: string,
  vpt1: number,
  vpt2: number,
  copa_nox: number,
  copa_venplay: number,
  puntaje: number,
  vpt_date: number,
  bullpadel: number,
  total: number
}

export const columnsToResults: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "who",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quien" />
    ),
    cell: ({ row }) => <div>{ row.getValue("who") }</div>
  },
  {
    accessorKey: "condition",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Condición" />
    ),
    cell: ({ row }) => <Badge variant={ row.getValue('condition') == 'defeat' ? 'destructive' : 'default' } className="uppercase">{ row.getValue('condition') == 'victory' ? 'victoria' : 'derrota' }</Badge>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "against",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contra quien" />
    ),
    cell: ({ row }) => <div>{row.getValue('against')}</div>
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Puntuación" />
    ),
    cell: ({ row }) => <div>{row.getValue('score')}</div>
  }
];

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "names",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Names" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("names")}</div>
  },
  {
    accessorKey: "ranking",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ranking" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("ranking")}</div>
  },
  {
    accessorKey: "categoria",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Categoria" />
    ),
    cell: ({ row }) => {
      const category = categories.find(
        (category) => category.value === row.getValue("categoria")
      )

      if (!category) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {category.icon && (
            <><category.icon className="mr-2 h-4 w-4 text-muted-foreground" /><></></>
          )}
          <span>{category.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "vpt1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VPT1" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("vpt1")}</div>
  },
  {
    accessorKey: "vpt2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="VPT2" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("vpt2")}</div>
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]