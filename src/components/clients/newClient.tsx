"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

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
    Card,
    CardTitle,
    CardHeader,
    CardFooter,
    CardDescription, 
    CardContent

 } from "../ui/card"

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
        .number()
        .min(10, { message: "The Phone number must be at least 10 numbers"})
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
});


export function NewClient({}) {

    function onSubmit() {
        
    }


    const form = useForm<z.infer<typeof clientSchema>>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            phonenumber: 0,

        },
    })
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
        <div className="w-full max-w-md px-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Label>Client Information</Label>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid-cols-3 flex">
                            <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}