import { cn } from "@/lib/utils";
import { FC } from "react";

interface TDividerProps extends React.HTMLAttributes<HTMLHRElement> { }

const Divider: FC<TDividerProps> = ({ className }) => {
    return <hr className={cn("my-4 border-t border-card-foreground/10", className)} />;
};

export default Divider;