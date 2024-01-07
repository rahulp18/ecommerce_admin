"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import { Store } from "@prisma/client"
 
export type SizesColumn = {
  id: string,
  name:string,
  value:string,
  createdAt:string
 
}

export const columns: ColumnDef<SizesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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