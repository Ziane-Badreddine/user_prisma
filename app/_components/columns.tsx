"use client"

import { user } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const columns: ColumnDef<user>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "prenom",
    header: "Prenom",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (({row}) => {
        const getDate = row.getValue("createdAt") as Date

        return (
            <div>
                {getDate.toDateString()}
            </div>
        )
    })
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <div className="w-full flex items-center gap-x-2">
                <Pencil className="h-5 w-5" />
                Edit
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="w-full flex items-center gap-x-2">
                <Trash2 className="h-5 w-5" />
                Delete
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
