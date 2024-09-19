"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }),
  location: z.string().min(2, { message: "Location must be at least 2 characters" }),
  profession: z.string().min(2, { message: "Profession must be at least 2 characters" }),
  dob: z.date({
    required_error: "Date of birth is required",
  }),
})

export default function SignUp() {
  const [date, setDate] = useState<Date>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    // Handle form submission here
  }

  return (
    <div className="min-h-screen   bg-red-500 px-4 sm:px-6 lg:px-8">
      <div className="  ">
        <div>
          <h2 className="mt-6 !text-red-500 text-center text-3xl font-extrabold ">
            Create your account
          </h2>
        </div>
        <form className="mt-8  " onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-6">
            <div className="mb-4">
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                {...register("email")}
                className={cn(
                  "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm",
                  errors.email && "border-red-500"
                )}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="username" className="sr-only">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                {...register("username")}
                className={cn(
                  "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm",
                  errors.username && "border-red-500"
                )}
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="phone" className="sr-only">
                Phone number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone number"
                {...register("phone")}
                className={cn(
                  "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm",
                  errors.phone && "border-red-500"
                )}
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="location" className="sr-only">
                Location
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="Location"
                {...register("location")}
                className={cn(
                  "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm",
                  errors.location && "border-red-500 text-red-400"
                )}
              />
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="profession" className="sr-only">
                Profession
              </Label>
              <Input
                id="profession"
                type="text"
                placeholder="Profession"
                {...register("profession")}
                className={cn(
                  "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm",
                  errors.profession && "border-red-500"
                )}
              />
              {errors.profession && (
                <p className="mt-2 text-sm text-red-600">{errors.profession.message}</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="dob" className="sr-only">
                Date of Birth
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Date of birth</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate)
                      setValue("dob", newDate as Date)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.dob && (
                <p className="mt-2 text-sm text-red-600">{errors.dob.message}</p>
              )}
            </div>
          </div>

          <div>
            <Button
              type="submit" variant={"outline"}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black  "
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}