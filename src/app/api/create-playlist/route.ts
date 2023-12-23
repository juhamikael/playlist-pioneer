import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "@/utils/constants";
import { cookies } from "next/headers";

/**
 * 
 * @param req - The request object
 * @returns Latest playlist created by the user { name, description, public, id }
 */
export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const cookie = cookies().get("spotify-access-token");
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({
            status: 400,
            message: "Missing userId parameter"
        });
    }

    if (!cookie) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized"
        });
    }

    const url = `${baseUrl}/users/${userId}/playlists`;

    const getPlaylists = await fetch(url, {
        headers: {
            Authorization: `Bearer ${cookie?.value}`
        }
    });

    const playlists = await getPlaylists.json();
    if (getPlaylists.status !== 200) {
        return NextResponse.json({
            status: 500,
            message: getPlaylists.statusText
        });
    }


    const playlistProps = {
        name: playlists.items[0].name,
        description: playlists.items[0].description,
        public: playlists.items[0].public,
        id: playlists.items[0].id
    }
    return NextResponse.json({
        status: 200,
        message: "Playlist fetched successfully",
        playlist: playlistProps
    });
}

/**
 * 
 * @param req - The request object
 * By default create a private playlist for the user with pre-defined name and description
 * The user can change the name, description and visibility of the playlist
 * @returns - A message based on the status code
 */
export async function POST(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const cookie = cookies().get("spotify-access-token");
    const body = await req.json();
    const userId = searchParams.get("userId");
    const { name, description, public: visibility } = body;

    if (!userId) {
        return NextResponse.json({
            status: 400,
            message: "Missing userId parameter"
        });
    }

    if (!cookie) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized"
        });
    }

    if (!name || !description || typeof visibility === "undefined") {
        return NextResponse.json({
            status: 400,
            message: "Missing name, description or visibility parameter"
        });
    }

    const url = `${baseUrl}/users/${userId}/playlists`;

    const createPlaylist = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${cookie?.value}`
        },
        body: JSON.stringify({
            name,
            description,
            public: visibility
        })

    });

    createPlaylist.json();

    if (createPlaylist.status !== 201) {
        return NextResponse.json({
            status: 500,
            message: createPlaylist.statusText
        });
    }

    return NextResponse.json({
        status: 200,
        message: "Playlist created successfully"
    });

}
