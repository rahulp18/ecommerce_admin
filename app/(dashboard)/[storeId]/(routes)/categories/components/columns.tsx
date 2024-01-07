"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
 
export type CategoryColumns = {
  id: string
  name:string
  billboardLabel:string
  createdAt:string
}

export const columns: ColumnDef<CategoryColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "BillBoard",
    cell:(({row})=>row.original.billboardLabel)
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

  {
    id:'actions',
    cell:({row})=><CellAction data={row.original} />
  }
 
]
