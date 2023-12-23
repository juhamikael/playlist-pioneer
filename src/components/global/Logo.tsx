import { cn } from "@/lib/utils";
import { FC } from "react";

type LogoProps = {
    textSize: "sm" | "lg";
    hover?: boolean;
};

const Logo: FC<LogoProps> = ({ textSize, hover = false }) => {
    const STYLE_SM = "text-3xl font-extrabold tracking-tighter sm:text-4xl"
    const STYLE_LG = "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
    return (
        <h1 className={cn(
            textSize === "sm" && STYLE_SM,
            textSize === "lg" && STYLE_LG,
        )}>
            <span className={cn("text-green-700", hover && "group-hover:text-green-600 transition-all ease-in-out hover:cursor-pointer")}>
                Playlist
            </span>
            <span className={cn(hover && "group-hover:text-slate-700 hover:cursor-pointer transition-all ease-in-out")}>
                {""}Pioneer
            </span>
        </h1>
    );
};

export default Logo;
