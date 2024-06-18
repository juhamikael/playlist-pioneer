"use client"
import { Badge } from "@/components/ui/badge"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRightCircle, ChevronDownCircle } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(800),
})

export function Contact() {
  const [step, setStep] = useState(1)
  const [showContact, setShowContact] = useState(false)
  useEffect(() => {
    setStep(1)
    setShowContact(false)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(values)
    })

  }

  return (
    <main className="mx-auto space-y-8">
      <div className="flex items-center gap-x-4 hover:cursor-pointer"
        onClick={() => setShowContact(!showContact)}
      >
        <h1 id="contact">Contact</h1>
        {!showContact ?
          <ChevronRightCircle className="w-6 h-6" /> : <ChevronDownCircle className="w-6 h-6" />
        }
      </div>

      {showContact &&
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="bg-[#f7f7f7] p-8 rounded-md">
              <CardHeader>
                <h2 className="text-2xl font-bold">
                  {step === 1 ? "Found a bug, have a question, or just want to say hi?" :
                    step === 2 ? "Your Email" :
                      "Your Message"}
                </h2>
                <Badge className={cn("w-fit")}>Step {step} of 3</Badge>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormDescription>
                            {"We promise this won't take long. Let's start with your name."}
                          </FormDescription>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                          <Button
                            onClick={() => setStep(2)}
                            disabled={!!form.formState.errors.name || form.getValues("name") === ""}
                          >
                            Next
                          </Button>
                        </FormItem>
                      )}
                    />

                  </>
                )}

                {step === 2 && (
                  <>

                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormDescription>
                        {"Great, now we need a way to get back to you."}
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          {...form.register("email")}
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="flex gap-x-4">
                        <Button variant={"outline"} onClick={() => setStep(1)}>Previous</Button>
                        <Button
                          disabled={!!form.formState.errors.email || form.getValues("email") === ""}
                          onClick={() => setStep(3)}
                        >
                          Next
                        </Button>
                      </div>
                    </FormItem>

                  </>
                )}

                {step === 3 && (
                  <>
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormDescription>
                        {"Now the fun part, tell us all the details!"}
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          className="min-h-[100px]"
                          placeholder="Enter your message"
                          {...form.register("message")}
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="flex gap-x-4">
                        <Button variant={"outline"} onClick={() => setStep(2)}>Previous</Button>
                        <Button
                          type="submit"
                          disabled={!!form.formState.errors.message || form.getValues("message") === ""}
                        >
                          Submit
                        </Button>
                      </div>
                    </FormItem>


                  </>
                )}
              </CardContent>
            </Card>
          </form>
        </Form>
      }
    </main>
  )
}
