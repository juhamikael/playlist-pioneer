"use client"
import { Badge } from "@/components/ui/badge"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRightCircle, ChevronDownCircle } from "lucide-react"

export function Contact() {
  const [step, setStep] = useState(1)
  const [showContact, setShowContact] = useState(false)
  useEffect(() => {
    setStep(1)
    setShowContact(false)
  }, [])

  return (
    <main className=" mx-auto space-y-8">
      <div className="flex items-center gap-x-4 hover:cursor-pointer"
        onClick={() => setShowContact(!showContact)}
      >
        <h1>Contact</h1>
        {!showContact ?
          <ChevronRightCircle className="w-6 h-6" /> : <ChevronDownCircle className="w-6 h-6" />
        }
      </div>

      {showContact &&
        <>
          {
            step === 1 && (
              <Card className="bg-[#f7f7f7] p-8 rounded-md">
                <CardHeader>
                  <h2 className="text-2xl font-bold">{"Found a bug, have a question, or just want to say hi?"}</h2>
                  <Badge className={cn("w-fit")}>Step 1 of 3</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{"We promise this won't take long. Let's start with your name."}</p>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                    <Button
                      onClick={() => setStep(2)}
                    >Next</Button>
                  </div>
                </CardContent>
              </Card>
            )}

          {
            step === 2 && (
              <Card className="bg-[#f7f7f7] p-8 rounded-md">
                <CardHeader>
                  <h2 className="text-2xl font-bold">Step 2: Your Email</h2>
                  <Badge className={cn("w-fit")}>Step 2 of 3</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Great, now we need a way to get back to you.</p>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter your email" type="email" />
                    <div className="flex gap-x-4">
                      <Button variant={"outline"} onClick={() => setStep(1)}>
                        Previous
                      </Button>
                      <Button variant={"outline"} onClick={() => setStep(3)}
                      >Next</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }
          {
            step === 3 && (
              <Card className="bg-[#f7f7f7] p-8 rounded-md">
                <CardHeader>
                  <h2 className="text-2xl font-bold">Final Step: Your Message</h2>
                  <Badge className={cn("w-fit")}>Step 3 of 3</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Now the fun part, tell us all the details!</p>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" />
                    <div className="flex gap-x-4">

                      <Button variant={"outline"} onClick={() => setStep(2)}>
                        Previous
                      </Button>
                      <Button
                        onClick={() => setStep(2)}
                        variant={"outline"}
                        className={cn("mr-right")}
                      >Submit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }
        </>
      }

    </main>
  )
}
