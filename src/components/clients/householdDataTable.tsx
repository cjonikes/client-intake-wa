"use client"

import { householdMember } from "@/lib/types"
import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type Props = {
  data: householdMember[];
  onAddHouseholdMember: (newMember: householdMember) => void;
}

export const columns: ColumnDef<householdMember>[] = [
  {
    id: "first name",
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
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("firstName")}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("age")}</div>
    ),
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sex")}</div>
    ),
  },
  {
    accessorKey: "relationship",
    header: "Relationship",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("relationship")}</div>
    ),
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("dob")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const householdMember = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(householdMember.firstName)}
            >
              Copy First Name.
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTable({ data, onAddHouseholdMember }: Props ) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Add new household member dialog components.

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<householdMember>({
      firstName: "",
      lastName: "",
      sex: "Female",
      relationship: "Child",
      age: 0,
      dob: "",
  });

  function calculateAge(dob: string): number {
    if (!dob) return 0;

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const age = calculateAge(value);
      setForm(prev => ({
        ...prev,
        dob: value,
        age
      }));
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onAddHouseholdMember({ ...form });
    setForm({
      firstName: "",
      lastName: "",
      sex: "",
      relationship: "",
      age: 0,
      dob: "",
    });
  };


  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("firstName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* New Member dialog trigger */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">+</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Household Member</DialogTitle>
            </DialogHeader>

            <div className="space-y-2 mt-2">
              <Input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
              />
              <Input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
              <Select
                value={form.sex}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, sex: value as "Female" | "Male" }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={form.relationship}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, relationship: value as "Child" | "Spouse" | "Relative" | "Non-Relative" }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Child">Child</SelectItem>
                  <SelectItem value="Spouse">Spouse</SelectItem>
                  <SelectItem value="Relative">Relative</SelectItem>
                  <SelectItem value="Non-Relative">Non-Relative</SelectItem>
                </SelectContent>
              </Select>
              <Input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
              />
               <Input className="invisible"
                name="age"
                type="Number"
                placeholder="Age"
                value={form.age as number}
                readOnly
              />
              <Button
                className="w-full mt-2"
                onClick={() => {
                  handleSubmit();
                  setOpen(false);
                }}
              >
                Add
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
