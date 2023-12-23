import { SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

type Variants = { variant: "default" | "destructive" | "outline" | "secondary" };

const CustomSignInButton = ({
    buttonText = "Sign In",
    buttonVariant = { variant: "default" }
}: {
    buttonText?: string,
    buttonVariant?: Variants
}) => {
    return (
        <SignInButton afterSignInUrl="/">
            <Button className="p-4" variant={buttonVariant.variant}>
                {buttonText}
            </Button>
        </SignInButton>
    );
};

export default CustomSignInButton;