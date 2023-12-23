"use client"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Divider from "./global/Divider"
import { useUserStore } from "@/store/userStore";
import { cn } from "@/lib/utils";

const CustomSwitch = ({ func, checked, label, currentValue }: { func: () => void, checked: boolean, label: string, currentValue: string }) => {
    return (
        <div>
            <Label className={cn("font-bold")}>{label}</Label>
            <div className="flex items-center gap-x-2">
                <Switch id="player-mode"
                    checked={checked}
                    onCheckedChange={func} />
                <Label className="capitalize" >{currentValue}</Label>
            </div>
        </div>
    )
}


const Preferences = () => {
    const { prefferedPlayer, setPrefferedPlayer, noPreviewTooltipText, setNoPreviewTooltipText } = useUserStore(state => state)

    const togglePlayerMode = () => {
        const newMode = prefferedPlayer === "custom" ? "spotify" : "custom";
        setPrefferedPlayer(newMode);
    }

    const toggleTooltipText = () => {
        const newText = noPreviewTooltipText === "explain" ? "short" : "explain";
        setNoPreviewTooltipText(newText);
    }

    return (
        <div>
            <div className="font-bold">Preferences</div>
            <Divider />
            <div className="flex flex-col gap-y-4">
                <CustomSwitch
                    func={togglePlayerMode}
                    checked={prefferedPlayer === "spotify"}
                    label="Player Mode"
                    currentValue={prefferedPlayer} />
                <CustomSwitch
                    func={toggleTooltipText}
                    checked={noPreviewTooltipText === "explain"}
                    label="Tooltip Text"
                    currentValue={noPreviewTooltipText} />
            </div>
        </div>
    );
};

export default Preferences;