"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Cookie } from "lucide-react"
import { useEffect, useState } from "react"
import { useCookieStore } from "@/store/cookieStore"
import Divider from "./Divider"
import { cn } from "@/lib/utils"
import Link from "next/link"
import CustomLink from "./CustomLink"
const CookieBanner = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const { userSeenCookieBanner, setUserSeenCookieBanner, acceptedAnalytics, setAcceptedAnalytics } = useCookieStore(state => state)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  if (userSeenCookieBanner) {
    return null
  }

  const handleSave = () => {
    setUserSeenCookieBanner(true)
    setIsOpen(false)
  }



  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <Card key="1" className={cn("w-full max-w-lg border-none shadow-none")}>
          <CardHeader >
            <div className="flex items-center">
              <Cookie className="mr-2" />
              <CardTitle>Cookie Preferences</CardTitle>
            </div>
            <CardDescription>
              Manage your cookie settings. You can enable or disable different types of cookies below.
            </CardDescription>
          </CardHeader>
          <Divider className="my-1" />
          <CardContent className="space-y-4 pt-4">
            <div className="flex justify-between items-start space-y-2">
              <div>
                <Label htmlFor="essential">Essential Cookies</Label>
                <p className="text-dark-gray-500 text-sm">
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
              </div>
              <Switch
                checked={true}
                className="ml-auto" id="essential" />
            </div>
            <div className="flex justify-between items-start space-y-2">
              <div>
                <Label htmlFor="analytics">Analytics Cookies</Label>
                <p className="text-dark-gray-500 text-sm">
                  These cookies allow us to count visits and traffic sources, so we can measure and improve the performance
                  of our site.
                </p>
              </div>
              <Switch
                checked={acceptedAnalytics}
                onCheckedChange={() => setAcceptedAnalytics(!acceptedAnalytics)}
                className="ml-auto" id="analytics" />
            </div>
          </CardContent>
          <Divider />
          <CardFooter className={cn("flex justify-around")}>
            <CustomLink
              asButton
              href="https://google.com"
            >
              Decline
            </CustomLink>
            <Button
              variant="outline"
              onClick={handleSave}
              type="submit">
              Accept
            </Button>
          </CardFooter>
        </Card>
      </AlertDialogContent>

    </AlertDialog>
  )
}

export default CookieBanner
