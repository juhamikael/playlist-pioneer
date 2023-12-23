import { NextResponse, NextRequest } from "next/server";
import { baseUrl } from "@/utils/constants";
import { cookies } from 'next/headers';

type Track = {
    name: string;
    artists: Array<{
        name: string;
    }>;
    id: string;
    album: {
        images: Array<{
            url: string;
        }>
    };
    preview_url: string;
};
/**
 * 
 * @param responseStatus - The status code of the response
 * @returns - A string based on the status code
 */
const checkStatusCode = (responseStatus: number) => {
    switch (responseStatus) {
        case 200:
            return "OK";
        case 401:
            return "Unauthorized";
        case 429:
            return "Too many requests";
        case 500:
            return "Internal server error";
        default:
            return "Unknown error";

    }
}
/**
 * 
 * Get recommendations based on the seed track and artist[0] provided
 * 
 * @param req - The request object 
 * Request body contains extra parameters for the Spotify API such as:
 * Danceability - The higher the value, the easier it is to dance to this song.
 * Energy - The higher the value, the more energetic the song.
 * 
 * @returns - An array of tracks { name, artist, id, image, preview_url }
 */
export async function POST(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const body = await req.json();
    const cookie = cookies().get("spotify-access-token");

    const artist = searchParams.get("artist");
    const track = searchParams.get("track");

    if (!artist || !track) {
        return NextResponse.json({
            status: 400,
            message: "Missing artist or track parameter"
        });
    }

    const response = await fetch(`${baseUrl}/recommendations?seed_artists=${artist}&seed_tracks=${track}&limit=12&${body}`, {
        headers: {
            Authorization: `Bearer ${cookie?.value}`
        },

    });
    const statusCode = checkStatusCode(response.status);
    if (statusCode !== "OK") {
        return NextResponse.json({
            status: response.status,
            message: statusCode
        });
    }

    const data = await response.json();

    const parsedData = data.tracks.map((track: Track) => ({
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(", "),
        id: track.id,
        image: track.album.images[0].url,
        preview_url: track.preview_url
    }));

    parsedData.filter((track: Track) => track.preview_url);
    return NextResponse.json({
        status: 200,
        body: parsedData
    });

}
