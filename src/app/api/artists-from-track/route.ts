import { NextResponse, NextRequest } from "next/server";
import { getToken } from "@/utils/getToken"
import { baseUrl } from "@/utils/constants";

import { cookies, headers } from 'next/headers'

type TArtist = {
    external_urls: {
        spotify: string
    },
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string
}


type TFeatures = {
    danceability: number,
    energy: number,
    key: number,
    loudness: number,
    mode: number,
    speechiness: number,
    acousticness: number,
    instrumentalness: number,
    liveness: number,
    valence: number,
    tempo: number,
    duration_ms: number,
    time_signature: number,
    type: string,
    id: string,
    uri: string,
    track_href: string,
    analysis_url: string,
    popularity: number
}

const calculateTempo = (tempo: number) => {
    if (tempo < 110) return { min_tempo: Math.max(tempo - 35, 0), max_tempo: tempo + 15 };
    if (tempo < 130) return { min_tempo: Math.max(tempo - 10, 0), max_tempo: tempo + 10 };
    if (tempo < 150) return { min_tempo: Math.max(tempo - 5, 0), max_tempo: tempo + 5 };
    return { min_tempo: Math.max(tempo - 2, 0), max_tempo: tempo + 5 };
};

const minMaxFeature = (featureName: string, value: number, offset = 0.6, maxCap = 1) => ({
    [`min_${featureName}`]: Math.max(value - offset, 0),
    [`max_${featureName}`]: Math.min(value + offset, maxCap)
});

const trackFeatures = (currentFeatures: TFeatures) => {
    const { danceability, energy, tempo } = currentFeatures;
    const features = {
        ...minMaxFeature('danceability', danceability),
        ...minMaxFeature('energy', energy),
        ...calculateTempo(tempo),
    };

    return Object.entries(features)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
};

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const accessToken = cookies().get("spotify-access-token");
    const track = searchParams.get("trackId");
    let parsedData = {
        artistName: "",
        artistId: "",
        trackId: ""
    }

    if (!accessToken) {
        return NextResponse.json({
            status: 400,
            body: {
                message: "You need to be logged in to access this route"
            }
        });
    }

    if (!track) {
        return NextResponse.json({
            status: 400,
            body: {
                message: "Missing track parameter"
            }
        });
    }
    const res = await fetch(`${baseUrl}/tracks/${track}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken?.value}`
            }
        }
    )
    const data = await res.json();
    const audioFeatures = await fetch(`${baseUrl}/audio-features/${track}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken?.value}`
            }
        }
    )
    const audioFeaturesData = await audioFeatures.json();
    const features = trackFeatures(audioFeaturesData);
    if (data.artists.length === 1) {
        parsedData = {
            artistName: data.artists[0].name,
            artistId: data.artists[0].id,
            trackId: track
        }
    } else if (data.artists.length > 5) {
        parsedData = {
            artistName: data.artists.slice(0, 5).map((artist: TArtist) => artist.name).join(", "),
            artistId: data.artists.slice(0, 5).map((artist: TArtist) => artist.id).join(", "),
            trackId: track
        }
    } else {
        parsedData = {
            artistName: data.artists.map((artist: TArtist) => artist.name).join(", "),
            artistId: data.artists.map((artist: TArtist) => artist.id).join(", "),
            trackId: track
        }
    }

    const inputTrackData = {
        name: data.name,
        artist: data.artists.map((artist: TArtist) => artist.name).join(", "),
        id: data.id,
        image: data.album.images[0].url,
        preview_url: data.preview_url
    }

    return NextResponse.json({
        status: 200,
        body: {
            parsedData,
            inputTrackData,
            recommendationFeatures: features
        }

    });
}