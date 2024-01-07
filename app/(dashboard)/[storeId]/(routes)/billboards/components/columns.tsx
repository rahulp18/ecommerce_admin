"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
 
export type BillBoard = {
  id: string
  label:string
  createdAt:string
}

export const columns: ColumnDef<BillBoard>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
