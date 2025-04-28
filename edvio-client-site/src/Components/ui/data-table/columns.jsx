"use client"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import useOneUser from "@/Hooks/useOneUser"
import { useState } from "react"
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
{
  accessorKey: "image",
  header: "Image",
  cell: ({ getValue }) => {
    const imageUrl = getValue();
    return <img src={imageUrl} alt="Preview" className="w-10 h-10 rounded-full object-cover mx-auto" />;
  },
},
{
  accessorKey: "name",
  header: "Name",
  cell: ({ getValue }) => {
    const instructor_name = getValue();
    return <p>{instructor_name}</p>;
  },
},

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={'text-sm'}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
{
  accessorKey: "mobile",
  header: "Phone Number",
  cell: ({ getValue }) => {
    const number = getValue();
    return <p>{number ? number : "N/A"}</p>; 
  },
}
,
  {
  accessorKey: "date",
  header: "Date",
  cell: ({ getValue }) => {
    const rawDate = getValue();
    const formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return <p>{formattedDate}</p>;
  },
},
  {
  accessorKey: "amount",
  header: () => <div className="text-center">Amount</div>,
  cell: ({ row }) => {
    const rawAmount = row.getValue("amount");
    const amount = parseFloat(rawAmount);
    if (isNaN(amount)) {
      return <div className="font-medium opacity-[0.8]">N/A</div>;
    }
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

    return <div className="font-medium opacity-[0.8]">{formatted}</div>;
  },
},
  {
    id: "actions",
  accessorKey: "action",
  header: "Action",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={'bg-white/30 p-3 rounded-lg shadow-lg border border-white/20 backdrop-blur-lg text-sm'}>
            <DropdownMenuItem>
               <Link to={`/dashboard/user-details/${user._id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        
      )
    },
  },
]
