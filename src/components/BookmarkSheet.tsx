
"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useBookmarkStore } from "@/store/bookmarkStore";
import SongCard from "./songCard/SongCard";
import Link from "next/link";
import { useAudioPlayerStore } from "@/store/audioPlayerStore";

const BookmarkSheet = ({ }) => {
    const { bookmarks } = useBookmarkStore(state => state)
    const { setStop } = useAudioPlayerStore(state => state)

    return (
        <Sheet onOpenChange={
            () => setStop()
        }>
            <SheetTrigger
                className={cn(buttonVariants({ variant: "outline" }))}
            >
                Show Bookmarks
            </SheetTrigger>
            <SheetContent className={cn("overflow-y-auto  ")}>
                <SheetHeader>
                    <SheetTitle>Bookmarks</SheetTitle>
                    <SheetDescription className={cn("text-lg font-bold")}>
                        {bookmarks.length} {bookmarks.length === 1 ? "track" : "tracks"} bookmarked.
                    </SheetDescription>
                    <SheetDescription>
                        When you are ready to continue, click the button below to save your bookmarks to a playlist.
                    </SheetDescription>
                </SheetHeader>
                <Link
                    onClick={() => setStop()}
                    href="/bookmarks" className={cn("w-full my-4", buttonVariants({ variant: "outline" }))}>
                    Proceed
                </Link>
                <div className="flex flex-col gap-y-4">
                    {
                        bookmarks.map(bookmark => {
                            return (
                                <SongCard
                                    previewUrl={bookmark.preview_url}
                                    image={bookmark.image}
                                    trackName={bookmark.name}
                                    artistName={bookmark.artist}
                                    id={bookmark.id}
                                    key={bookmark.id}
                                    bookmarkPlayer={true}
                                />
                            )
                        })

                    }
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default BookmarkSheet;
