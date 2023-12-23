
"use client"
import { CardTitle, CardDescription, CardHeader, Card, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import React from 'react'
import AudioPlayer from "./audioPlayer"
import { toast } from "sonner"
import { XCircleIcon as X, BookmarkIcon } from "lucide-react"
import { useBookmarkStore } from "@/store/bookmarkStore"
import { useCurrentTrackStore } from "@/store/currentTrackStore"
import { fetchRecommendations } from "@/lib/fetchRecommendations"
import { useRecommendationsStore } from "@/store/recommendationStore"
import { useAudioPlayerStore } from "@/store/audioPlayerStore"
import Image from "next/image"
import SpotifyPlayer from "./SpotifyPlayer"
import { useUserStore } from "@/store/userStore"
import CustomImage from "./CustomImage"



export default function SongCard(
    {
        previewUrl,
        image,
        trackName,
        artistName,
        id,
        bookmarkPlayer = false
    }: {
        previewUrl?: string,
        trackName: string,
        artistName: string
        image: string
        id: string
        bookmarkPlayer?: boolean
    }) {
    const { bookmarks, setBookmarks } = useBookmarkStore(state => state)
    const { setCurrentTrack } = useCurrentTrackStore(state => state)
    const { setRecommendations } = useRecommendationsStore(state => state)
    const { setStop } = useAudioPlayerStore(state => state)
    const { prefferedPlayer } = useUserStore(state => state)

    const saveBookmark = () => {
        // Check if the track is already bookmarked
        const isBookmarked = bookmarks.some(bookmark => bookmark.id === id);

        if (isBookmarked) {
            setBookmarks(currentBookmarks =>
                currentBookmarks.filter(bookmark => bookmark.id !== id)
            );
            toast.success("Bookmark removed");
        } else {
            const newBookmark = {
                name: trackName,
                artist: artistName,
                id: id,
                image: image,
                preview_url: previewUrl
            };

            setBookmarks(currentBookmarks => [...currentBookmarks, newBookmark]);
            toast.success("Bookmark saved");
        }
    };

    const isTrackBookmarked = bookmarks.find(bookmark => bookmark.id === id);
    const currentTrackUrl = `https://open.spotify.com/track/${id}`
    return (
        <Card className="relative">
            <CardHeader className="flex justify-around ">
                {
                    prefferedPlayer === "spotify" && (
                        <>

                            <div className="flex justify-end">
                                <Button
                                    onClick={saveBookmark}
                                    variant="link">
                                    {
                                        isTrackBookmarked ?
                                            <div className="flex items-center gap-x-4">
                                                Remove Bookmark
                                                <X className="w-6 h-6 text-destructive" />
                                            </div>
                                            :
                                            <div className="flex items-center gap-x-4">
                                                Bookmark this
                                                <BookmarkIcon className="w-6 h-6 fill-green-500 text-green-500" />
                                            </div>
                                    }
                                </Button>
                            </div>
                            <SpotifyPlayer id={id} />
                        </>
                    )}
                {prefferedPlayer === "custom" && (
                    <div className="flex justify-between w-full">
                        <div className="flex gap-x-4">
                            <>

                                {!previewUrl ?
                                    (<CustomImage bookMarkPlayer={bookmarkPlayer} image={image} trackName={trackName} />) : (
                                        <AudioPlayer
                                            imageSrc={image}
                                            audioSrc={previewUrl}
                                            bookMarkPlayer={bookmarkPlayer}
                                        />
                                    )
                                }

                                <div className="flex flex-col gap-y-2">
                                    <div>
                                        <CardTitle className="text-lg font-semibold">{trackName}</CardTitle>
                                        <CardDescription className="text-md">{artistName}</CardDescription>
                                    </div>

                                </div>
                            </>
                        </div>

                        <Button
                            onClick={saveBookmark}
                            className="p-1" variant="link">
                            {
                                isTrackBookmarked ? <X className="w-6 h-6 text-destructive" /> : <BookmarkIcon className="w-6 h-6 fill-green-500 text-green-500" />
                            }
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardFooter>
                <Button
                    onClick={() => {
                        fetchRecommendations(setCurrentTrack, setRecommendations, currentTrackUrl, { id, name: trackName, artist: artistName, image: image, preview_url: previewUrl })
                        setStop()
                    }}
                    variant={"link"} className="w-full">
                    Search for similar tracks to this one
                </Button>
            </CardFooter>

        </Card>
    )
}

