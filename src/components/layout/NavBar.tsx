"use client"
import { UserButton, currentUser, auth, useUser } from "@clerk/nextjs";
import CustomSignInButton from "@/components/clerk/CustomSignInButton"
import MaxWidthWrapper from "../MaxWidthWrapper";
import Logo from "../global/Logo";
import CustomLink from "../global/CustomLink";

import { Settings } from "lucide-react"
import FAQ from "../FAQ";
import Preferences from "../Preferences";
const NavBar = ({ }) => {
    const { isLoaded, user, isSignedIn } = useUser();

    return (
        <MaxWidthWrapper className="flex justify-between py-4 border-b border-card-foreground/20 ">
            <CustomLink href="/" className="group">
                <Logo hover textSize={"sm"} />
            </CustomLink>

            <div className="ml-auto flex gap-4 sm:gap-6 items-center">
                <CustomLink href="/about" asLink>
                    About
                </CustomLink>
                <CustomLink href="/faq" asLink>
                    FAQ
                </CustomLink>
                <CustomLink href="/contact" asLink>
                    Contact
                </CustomLink>
                {
                    isLoaded && isSignedIn ? (
                        <div className="flex items-center gap-x-5">
                            <CustomLink href="/bookmarks" asLink>
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
