"use client"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import Logo from "./global/Logo"
import CustomSignInButton from "@/components/clerk/CustomSignInButton"
import { Badge } from "./ui/badge"
import CustomLink from "./global/CustomLink"
import Divider from "./global/Divider"
import Image from "next/image"
function LandingPage() {
  return (
    <>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Logo textSize={"lg"} />
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {"Just insert into Spotify a track, and you've got magic. Today you might just find the next musical obsession."}
                </p>
                <Badge variant={"outline"} className={"mx-auto text-base"}>
                  {"Utilizes Spotify's API."}
                </Badge>
              </div>
              <div className="space-x-4">
                <CustomSignInButton buttonText="Get Started" />
                <CustomLink href="/about" asButton>
                  Learn More
                </CustomLink>
              </div>
            </div>
          </div>
        </section>
        <Divider />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">

              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge >
                    Screenshot
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Beautiful and Intuitive Interface</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Our app is designed to be intuitive and user-friendly, making your music discovery process a breeze.
                  </p>
                </div>
              </div>
              <Image
                src="/screenshot1.png"
                alt="Playlist Pioneer"
                width={600}
                height={600}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full border" />
            </div>
          </div>
        </section>
        <Divider />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <Image
                src="/screenshot2.png"
                alt="Playlist Pioneer"
                width={600}
                height={600}
                className="hidden lg:block mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full border" />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge>
                    Screenshot
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Craft Your Playlist</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Bookmark tracks as you explore. Shape your playlist with songs that resonate with you. Simple, personalized, and entirely in your control.
                  </p>
                </div>
              </div>
              <Image
                src="/screenshot2.png"
                alt="Playlist Pioneer"
                width={600}
                height={600}
                className="block lg:hidden mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full border" />
            </div>
          </div>
        </section>
      </main>

    </>
  )
}

export default LandingPage

