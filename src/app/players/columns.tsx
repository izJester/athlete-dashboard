"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./components/data-table-column-header"
import { DataTableRowActions } from "./components/data-table-row-actions"
import { Badge } from "@/components/ui/badge"
import { categories } from "./data"


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
    accessorKey: "team1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equipo 1" />
    ),
    cell: ({ row }) => {
      const data: any = row.getValue('team1')

      return <span> { data.join(', ') } </span>
    }
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
    accessorKey: "team2",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equipo 2" />
    ),
    cell: ({ row }) => {
      const data: any = row.getValue('team2')

      return <span> { data.join(', ') } </span>
    }
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