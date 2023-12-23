"use client"

import { useEffect, useState } from "react";
import { Button, } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SongCard from "@/components/songCard/SongCard";
import BookmarkSheet from "./BookmarkSheet";
import { cn } from "@/lib/utils";
import { setCookie } from 'cookies-next';
import { useAudioPlayerStore } from "@/store/audioPlayerStore"
import { useCurrentTrackStore } from "@/store/currentTrackStore"
import { useRecommendationsStore } from "@/store/recommendationStore";
import { fetchRecommendations } from "@/lib/fetchRecommendations"
import { TTrack } from "@/types/spotify";
import { useUserStore } from "@/store/userStore";

const setCookieHandler = (token: string) => {
  setCookie('spotify-access-token', token,
    {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
}


const GetRecommendations = ({ token, spotifyUserId }: { token: string, spotifyUserId: string | undefined }) => {
  const [input, setInput] = useState("")
  const { setVolume, volume } = useAudioPlayerStore(state => state)
  const { currentTrack, setCurrentTrack } = useCurrentTrackStore(state => state)
  const { recommendations, setRecommendations } = useRecommendationsStore(state => state)

  const { setSpotifyUserId } = useUserStore(state => state)
  const [mounted, setMounted] = useState(false)
  const [havePreviewUrl, setHavePreviewUrl] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    const fetchToken = async () => {
      if (token) {
        setCookieHandler(token)
      }
    }
    fetchToken();

    if (spotifyUserId) {
      setSpotifyUserId(spotifyUserId)
    }

  }, [token, spotifyUserId])

  useEffect(() => {
    if (currentTrack && currentTrack.preview_url) {
      setHavePreviewUrl(true)
    }
  }, [currentTrack])

  if (!mounted) {
    return null
  }
  const handleSearch = () => {
    fetchRecommendations(setCurrentTrack, setRecommendations, input, currentTrack)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };
  return (
    <div>
      <div className="flex justify-center">
        <Input
          name="artist"
          placeholder="Paste Spotify track URL here"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
      </div>
      <div className="flex py-4 gap-x-4">
        <Button className={cn("w-full font-black tracking-wide bg-green-500 hover:bg-green-500/80  ")}
          onClick={handleSearch}
        >Search</Button>
        <BookmarkSheet />
      </div>
      <div>
        <label htmlFor="volume">Volume</label>
        <input
          id="volume"
          className="w-full"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div>
        {
          currentTrack && havePreviewUrl ? (
            <>
              <div className="text-3xl font-black py-2">Current Track</div>
              <SongCard
                key={currentTrack.id}
                trackName={currentTrack.name}
                artistName={currentTrack.artist}
                image={currentTrack.image}
                previewUrl={currentTrack.preview_url}
                id={currentTrack.id}
              />
            </>) : (<div className="text-3xl font-black py-10 text-center">
              {"Sorry, we can't find any track with preview url 😔"}
            </div>)
        }
      </div>
      {
        recommendations && (
          <>
            <div className="text-3xl font-black py-2">Recommendations</div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4">
              {
                recommendations.map((track: TTrack) => {
                  return (
                    <SongCard
                      key={track.id}
                      trackName={track.name}
                      artistName={track.artist}
                      image={track.image}
                      previewUrl={track.preview_url}
                      id={track.id}
                    />
                  )
                })
              }
            </div>
          </>
        )
      }
    </div >
  );
};

export default GetRecommendations;
