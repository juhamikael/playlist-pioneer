import { FC } from "react";
import Link from "next/link";
import { useAudioPlayerStore } from "@/store/audioPlayerStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface CustomLinkProps extends React.HTMLAttributes<HTMLDivElement> {
    href: string;
    children: React.ReactNode;
    asLink?: boolean;
    asButton?: boolean;

}

const CustomLink: FC<CustomLinkProps> = ({
    href,
    children,
    asLink = false,
    asButton = false,
    className,
}) => {
    const { setStop } = useAudioPlayerStore()
    const onClickHandler = () => {
        setStop()
    }

    return (
        <Link
            href={href}
            onClick={onClickHandler}
            className={cn(
                "text-sm font-medium transition-all",
                asLink && "hover:underline underline-offset-4",
                asButton && buttonVariants({ variant: "outline", size: "default" }),
                className
            )}
        >
            {children}
        </Link>
    )

};

export default CustomLink;