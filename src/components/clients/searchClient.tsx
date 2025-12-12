"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

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


export function SearchClient({}) {
  
  function onSubmit() {
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
    <div>
      <div className="w-full px-1">
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className="space-y-2  flex flex-col  mx-auto border p-6 rounded-md">
                        <FormLabel className="flex items-center justify-center">Advanced Search</FormLabel>
                        <h2 className="text-xl">{"Client's Information"}</h2>
                        <Separator />
                        <div className="grid grid-cols-4 gap-4 grid-rows-1">
                          <div className= "grid grid-cols-1" >
                            <h2 className="">First Name</h2>   
                            <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                          </div>
                          <div className= "grid grid-cols-1" >
                            <h2 className="">Last Name</h2>   
                            <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                          </div>
                          <div className= "grid grid-cols-1" >
                            <h2 className="">Case ID</h2>   
                            <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                          </div>
                          {/* <FormField
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
                                      <FormMessage />
                                      </FormItem>
                                  )}
                                  /> */}
                          <div className="flex flex-col mx-auto">
                            <h2 className="">Date of Birth (MM-DD-YYYY)</h2>      
                            <div className="grid grid-cols-3 flex flex-col">
                              <FormField
                                  control={form.control}
                                  name="email"
                                  render={({ field }) => (
                                      <FormItem>
                                      <FormLabel></FormLabel>
                                      <FormControl>
                                          <Input placeholder="MM" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                      </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="email"
                                  render={({ field }) => (
                                      <FormItem>
                                      <FormLabel> </FormLabel>
                                      <FormControl>
                                          <Input placeholder="DD" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                      </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="email"
                                  render={({ field }) => (
                                      <FormItem>
                                      <FormLabel></FormLabel>
                                      <FormControl>
                                          <Input placeholder="YYYY" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                      </FormItem>
                                  )}
                                />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 flex flex-col">
                          <div className="flex flex-col gap-2">
                            <h2 className="">Email</h2>      
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel></FormLabel>
                                  <FormControl>
                                      <Input placeholder="JohnDoe@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <h2 className="">Phone Number</h2>      
                                <div className="grid grid-cols-3 space-x-4 flex flex-col">
                                  <FormField
                                      control={form.control}
                                      name="phonenumber"
                                      render={({ field }) => (
                                          <FormItem>
                                          <FormLabel></FormLabel>
                                          <FormControl>
                                              <Input placeholder="MM" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                          </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={form.control}
                                      name="phonenumber"
                                      render={({ field }) => (
                                          <FormItem>
                                          <FormLabel> </FormLabel>
                                          <FormControl>
                                              <Input placeholder="DD" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                          </FormItem>
                                      )}
                                    />
                                    <FormField
                                      control={form.control}
                                      name="phonenumber"
                                      render={({ field }) => (
                                          <FormItem>
                                          <FormLabel></FormLabel>
                                          <FormControl>
                                              <Input placeholder="YYYY" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                          </FormItem>
                                      )}
                                    />
                                </div>
                              </div>
                            </div>
                            <h2 className="text-xl">{"Address"}</h2>
                            <Separator/>
                            <div className="grid grid-cols-3 gris-rows-2 gap-2">
                              <div className="flex flex-col gap-2">
                              <h2 className="">Address</h2>
                              <FormField
                                      control={form.control}
                                      name="phonenumber"
                                      render={({ field }) => (
                                          <FormItem>
                                          <FormLabel></FormLabel>
                                          <FormControl>
                                              <Input placeholder="YYYY" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                          </FormItem>
                                      )}
                                    />
                              </div>
                              <div className="flex flex-col gap-2">
                              <h2 className="">City</h2>
                              <FormField
                                      control={form.control}
                                      name="phonenumber"
                                      render={({ field }) => (
                                          <FormItem>
                                          <FormLabel></FormLabel>
                                          <FormControl>
                                              <Input placeholder="YYYY" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                          </FormItem>
                                      )}
                                    />
                              </div>
                              <div className="flex flex-col gap-2">
                              <h2 className="">State</h2>
                              <FormField
                                      control={form.control}
                                      name="phonenumber"
                                      render={({ field }) => (
                                          <FormItem>
                                          <FormLabel></FormLabel>
                                          <FormControl>
                                              <Input placeholder="YYYY" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                          </FormItem>
                                      )}
                                    />
                              </div>
                              <div className="flex flex-col gap-2">
                              <h2 className="">Zip</h2>
                              <FormField
                                      control={form.control}
                                      name="phonenumber"
                                      render={({ field }) => (
                                          <FormItem>
                                          <FormLabel></FormLabel>
                                          <FormControl>
                                              <Input placeholder="YYYY" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                          </FormItem>
                                      )}
                                    />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                            <Button>Search</Button>
                            <Button>Clear</Button>
                            </div>
                            <Separator></Separator>
                        
                    </form>
                </Form>
          
      </div>
      <div className="w-full px-1">
        <div className="border p-6 rounded-md space-y-2">
        <h1>Results</h1>
        <Separator></Separator>
        </div>
      </div> 
    </div>
  )
}