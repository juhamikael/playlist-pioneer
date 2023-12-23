import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const CustomSignOutButton = ({ }) => {
    return (
        <SignOutButton>
            <Button className="p-4" variant="outline">
                Sign Out
            </Button>
        </SignOutButton>
    );
};

export default CustomSignOutButton;
