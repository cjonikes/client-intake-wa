"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ScrollArea } from "../ui/scroll-area"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
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
        .string()
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
    ,
    postalcode: z
        .string()
    ,
    householdsize: z
        .string(),
});


export function NewClient({}) {

    function onSubmit() {
        console.log("")
    }

    function onClear(){
        console.log("")
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
        <div className="w-full max-w-xl px-1">
            
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
                            <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input placeholder="0" {...field} />
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
                        <h2 className="text-xl">{"Qualifying Reasons"}</h2>
                        <Separator/>
                        <div>
                            {/* Qualifyin reasons */}
                        </div>
                        <h2 className="text-xl">{"Household Members"}</h2>
                        <Separator/>
                        <div>
                            <Table>
                                <TableCaption>A list of your recent invoices.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="w-[100px]">Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                    <TableCell className="font-medium">INV001</TableCell>
                                    <TableCell>Paid</TableCell>
                                    <TableCell>Credit Card</TableCell>
                                    <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
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