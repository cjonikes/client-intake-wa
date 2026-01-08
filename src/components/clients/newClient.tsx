"use client"

import { z } from "zod"
import { householdMember } from "@/lib/types"
import { stateMap } from "@/utils/stateAbbreviations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
 
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

import { 
    Form,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
    FormDescription,
    FormField
 } from "../ui/form"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Separator } from "../ui/separator"
import {  
    Popover,
    PopoverContent,
    PopoverTrigger, 
} from "../ui/popover"

import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { 
    Command, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem, 
    CommandList } from "../ui/command"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { DataTable } from "./householdDataTable"

// TODO: Finish the client schema
const clientSchema = z.object({
    firstname: z
        .string()
        .min(2, { message: "The name must not be less than 2 characters"})
        .max(50,{ message: "The name must not exceed nmore than 50 characters"})
    ,
    lastname: z
        .string()
        .min(2, { message: "The name must not be less than 2 characters"})
        .max(50,{ message: "The name must not exceed nmore than 50 characters"})
    ,
    phonenumber: z
        .string()
        .min(10, { message: "Invalid phone number format. Example: 123-456-7890" })
        .regex(/^\d{3}-\d{3}-\d{4}$/, {message: "Invalid phone number format. Example: 123-456-7890"})
    ,
    dateofbirth: z
        .date()
    ,
    email: z
        .string()
        .email()
    ,
    sex: z
        .string()
    ,
    street: z
        .string()
    ,
    city: z
        .string()
    ,
    state: z
        .string()
        .min(2, { message: "Enter a state"})
        .refine((state) => stateMap.some((item) => item.value === state), { message: "Invalid state selected",})
    ,
    postalcode: z
        .string()
        .regex(/^\d+$/, { message: "Must be a valid number" })
    ,
    householdsize: z
        .number(),
});

const data: householdMember[] = [
  {
    firstName: "Novelk",
    lastName: "Larino",
    sex: "Male",
    relationship: "child",
    age: 16,
    dob: "nan",
  },
  {
    firstName: "Ayeleen",
    lastName: "Quick",
    sex: "Female",
    relationship: "spouse",
    age: 24,
    dob: "nan",
  },
]

export function NewClient({}) {

    function onSubmit() {
        console.log("")
    }

    function onClear(){
        console.log("")
    }

     const [householdMembers, setHouseholdMembers] = useState<householdMember[]>([]);

    const addNewMember = (householdMembers: householdMember) => {
        setHouseholdMembers(prev => [...prev, { ...householdMembers}]);
    }

    const form = useForm<z.infer<typeof clientSchema>>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            phonenumber: "",

        },
    })
  return (
    
    <div className="flex items-center justify-center min-h-screen w-full">
        <div className="">

                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className="space-y-8 max-w-2xl flex flex-col  mx-auto border p-6 rounded-md">
                        <FormLabel className="flex items-center justify-center">New Client Form</FormLabel>
                        <h2 className="text-xl">{"Client's Information"}</h2>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4 grid-rows-1">
                        <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormDescription>
                                Client's public display first name.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormDescription>
                                Client's public display last name.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="JohnDoe@example.com" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    Email address. 
                                </FormDescription> */}
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                control={form.control}
                                name="phonenumber"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="856-111-2222" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        House or Cellphone Number.
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="sex"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Sex</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Male" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Client's Sex / Gender.
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="dateofbirth"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <h2 className="text-xl">{"Address"}</h2>
                            <Separator/>
                            <div className="grid grid-cols-2 gap-2">
                                <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Sesame Street Apt #2" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Newark" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {/* <FormField
                            control={form.control}
                            name="aStateAbbreviation"
                            render={({ field }) => <StateAbreviationField field={field} />}
                            /> */}
                            {/* TODO: Fix the state abbreviation method below */}
                           <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex. NJ" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="postalcode"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="0" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="householdsize"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Household Size</FormLabel>
                                <FormControl>
                                    <Input
                                    type="number"
                                    min={1}
                                    step={1}
                                    placeholder="1"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <Separator/>
                        <h2 className="text-xl">{"Programs"}</h2>
                        <Separator/>
                        <div className="grid grid-rows-3 flex gap-4">
                            {/* Qualifyin reasons */}
                            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                <Checkbox
                                id="toggle-2"
                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                />
                                <div className="grid gap-1.5 font-normal">
                                <p className="text-sm leading-none font-medium">
                                    Emergency Food Assistance
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    Food assistance for clients.
                                </p>
                                </div>
                            </Label>
                            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                <Checkbox
                                id="toggle-2"
                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                />
                                <div className="grid gap-1.5 font-normal">
                                <p className="text-sm leading-none font-medium">
                                    Emergency Utility Assistance
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    Utility assistance for clients.
                                </p>
                                </div>
                            </Label>
                            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                                <Checkbox
                                id="toggle-2"
                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                />
                                <div className="grid gap-1.5 font-normal">
                                <p className="text-sm leading-none font-medium">
                                    Angel Tree
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    Christmas toys for kids from newborn to 13 years old.
                                </p>
                                </div>
                            </Label>
                            
                        </div>
                        <h2 className="text-xl">{"Household Members"}</h2>
                        <Separator/>
                        <div>
                            <DataTable data={householdMembers} onAddHouseholdMember={addNewMember}/>
                        </div>
                        <div className="grid grid-cols-2 gap-20">
                            <Button type="reset" variant="secondary" onClick={onClear}>Clear</Button>
                            <Button type="submit"  variant="default" onClick={onSubmit}>Submit</Button>
                        </div>
                    </form>
                </Form>
          
        </div> 
    </div>
  )
}