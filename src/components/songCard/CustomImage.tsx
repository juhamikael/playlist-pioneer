"use client"

import Image from 'next/image';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useUserStore } from '@/store/userStore';

const CustomImage = ({ image, trackName, bookMarkPlayer }: { image: string, trackName: string, bookMarkPlayer: boolean }) => {
    const { noPreviewTooltipText } = useUserStore(state => state)
    const multiplier = bookMarkPlayer ? 0.7 : 1;
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>

                    <div className="relative flex items-center justify-center">
                        <div
                            style={{
                                // Multilpier 
                                width: `${140 * multiplier}px`,
                                height: `${140 * multiplier}px`,
                            }}
                            className="bg-gray-300 rounded-full animate-pulse"
                        />
                        <div
                            style={{
                                position: 'absolute',
                                width: '120px',
                                height: '120px',
                            }}
                            className="rounded-full flex items-center justify-center"
                        >
                            <Image
                                src={image}
                                alt={trackName}
                                width={120 * multiplier}
                                height={120 * multiplier}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{"We don't have preview url for this track"}</p>
                    {noPreviewTooltipText === "explain" ? (
                        <>
                            <br />
                            <p className="font-bold">{"If you want to hear this track"}</p>
                            <ol className="list-decimal px-4">
                                <li>{"Click your profile picture on top right corner"}</li>
                                <li>{"Manage Account"}</li>
                                <li>{"Open preferences tab"}</li>
                                <li>{"Change player mode"}</li>
                            </ol>
                        </>
                    ) : (
                        <p className="italic">Change player mode in <span className="font-bold">preferences</span> tab</p>
                    )
                    }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    );
};

export default CustomImage;
