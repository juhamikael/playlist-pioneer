import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface MaxWidthWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ children, className }) => {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-screen-xl px-2.5 md:px-10 py-10",
                className
            )}
        >
            {children}
        </div>
    );
};

export default MaxWidthWrapper;