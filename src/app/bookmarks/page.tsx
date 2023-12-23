"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useBookmarkStore } from "@/store/bookmarkStore";
import AudioPlayer from "@/components/songCard/audioPlayer"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { XCircle as X, ChevronLeftCircle as LeftCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { TTrack } from "@/types/spotify";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import PlaylistCreationDialog from "@/components/PlaylistCreationDialog";
import { useAudioPlayerStore } from "@/store/audioPlayerStore";
import CustomImage from "@/components/songCard/CustomImage";
import { useUserStore } from "@/store/userStore";
import SpotifyPlayer from "@/components/songCard/SpotifyPlayer";

const BookmarkPage = ({ }) => {
    const { bookmarks, setBookmarks } = useBookmarkStore(state => state)
    const { prefferedPlayer } = useUserStore(state => state)

    const { setStop } = useAudioPlayerStore(state => state)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <MaxWidthWrapper>
            <Link
                className={cn(buttonVariants({ variant: "outline" }))}
                href={"/"}
                onClick={() => setStop()}
            >
                <LeftCircle className="mr-2 h-4 w-4" />
                Back to recommendations
            </Link>

            <div className="flex justify-center flex-col text-center py-4">
                <h1 className="text-lg font-bold">
                    Double check your bookmarked track(s) before you move on.
                </h1>
                <p>{"When you feel you're ready, click the button below to generate your playlist."}</p>

                <PlaylistCreationDialog />
            </div>

            <Table className="w-full">
                <TableCaption>A list of your bookmarked track(s).</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead className="">Artist(s)</TableHead>
                        <TableHead>Track Name</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookmarks.map((bookmark: TTrack) => {
                        return (
                            <TableRow key={bookmark.id}>
                                <TableCell >
                                    <>
                                        {prefferedPlayer === "spotify" &&
                                            <SpotifyPlayer customWidth height={80} id={bookmark.id} />
                                        }
                                        {prefferedPlayer === "custom" &&
                                            <>
                                                {!bookmark.preview_url ?
                                                    (<CustomImage bookMarkPlayer={true} image={bookmark.image} trackName={bookmark.name} />) : (
                                                        <AudioPlayer
                                                            imageSrc={bookmark.image}
                                                            audioSrc={bookmark.preview_url}
                                                            bookMarkPlayer={true}
                                                        />
                                                    )
                                                }
                                            </>
                                        }
                                    </>
                                </TableCell>
                                <TableCell >{bookmark.artist}</TableCell>
                                <TableCell>{bookmark.name}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        className={cn("border-none bg-transparent hover:bg-transparent")}
                                        onClick={() => {
                                            setBookmarks((currentBookmarks) =>
                                                currentBookmarks.filter((b) => b.id !== bookmark.id)
                                            );
                                            toast.success("Bookmark removed");
                                        }}
                                    >
                                        <X className="text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}

                </TableBody>
            </Table>
        </MaxWidthWrapper>
    );
};

export default BookmarkPage;
