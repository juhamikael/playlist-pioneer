"use client"
import { UserButton, currentUser, auth, useUser } from "@clerk/nextjs";
import CustomSignInButton from "@/components/clerk/CustomSignInButton"
import MaxWidthWrapper from "../MaxWidthWrapper";
import Logo from "../global/Logo";
import CustomLink from "../global/CustomLink";

import { Settings } from "lucide-react"
import Preferences from "../Preferences";
import { Menu } from "lucide-react"
// Convert Drawer to Sheet until there is from top support
// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerDescription,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
//     DrawerFooter,
// } from "@/components/ui/drawer"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Divider from "./Divider";

const Links = [
    {
        label: "About",
        url: "/about",
    },
    {
        label: "FAQ",
        url: "/faq",
    },
    {
        label: "Contact",
        url: "/contact",
    },
]

const NavBar = ({ }) => {
    const { isLoaded, isSignedIn } = useUser();

    const MenuItems = () => {
        return (
            <>
                {Links.map(({ label, url }) => (
                    <CustomLink href={url} asLink key={label}>
                        {label}
                    </CustomLink>
                ))}
            </>
        )
    };
    return (
        <MaxWidthWrapper className="flex justify-between py-4 border-b border-card-foreground/20 relative">
            <CustomLink href="/" className="group">
                <Logo hover textSize={"sm"} />
            </CustomLink>

            <div className="ml-auto flex items-center ">
                <div className="hidden lg:flex gap-x-6 mx-6 items-center ">
                    <MenuItems />
                </div>

                <Sheet>
                    <SheetTrigger><Menu className="lg:hidden mx-4 hover" size={32} /></SheetTrigger>
                    <SheetContent side={"top"}>
                        <SheetHeader>
                            <SheetTitle>Navigation Menu</SheetTitle>
                        </SheetHeader>
                        <Divider className="my-4" />
                        <div className="flex flex-col gap-y-4 my-2 text-center">

                            {
                                isLoaded && isSignedIn && (
                                    <CustomLink href="/bookmarks" asLink>
                                        Bookmarks
                                    </CustomLink>
                                )
                            }
                            <MenuItems />
                        </div>
                    </SheetContent>
                </Sheet>

                {/* <Drawer >
                    <DrawerTrigger>
                        <Menu className="lg:hidden mx-4 hover" size={32} />
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>
                                <div className="flex flex-col gap-y-4 my-2 text-left">
                                    Navigation Menu
                                    {
                                        isLoaded && isSignedIn && (
                                            <CustomLink href="/bookmarks" asLink>
                                                Bookmarks
                                            </CustomLink>
                                        )
                                    }
                                    <MenuItems />
                                </div>
                            </DrawerTitle>

                        </DrawerHeader>

                    </DrawerContent>
                </Drawer> */}
                {
                    isLoaded && isSignedIn ? (
                        <div className="flex items-center gap-x-5">
                            <CustomLink className="hidden lg:block ml-5" href="/bookmarks" asLink>
                                Bookmarks
                            </CustomLink>
                            <UserButton afterSignOutUrl="/" >
                                <UserButton.UserProfilePage label="Preferences" url="custom" labelIcon={<Settings className="h-4 w-4" />}>
                                    <Preferences />
                                </UserButton.UserProfilePage>
                            </UserButton>
                        </div>
                    ) : (<CustomSignInButton buttonVariant={{ variant: "outline" }} />)
                }
            </div>


        </MaxWidthWrapper>
    );
};

export default NavBar;
