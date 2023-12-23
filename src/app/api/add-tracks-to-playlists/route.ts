import { NextRequest, NextResponse } from "next/server";
import { baseUrl } from "@/utils/constants";
import { cookies } from "next/headers";


export async function POST(req: NextRequest) {
    const cookie = cookies().get("spotify-access-token");
    const body = await req.json();
    const { uris, playlist_id } = body;

    if (!playlist_id) {
        return NextResponse.json({
            status: 400,
            message: "Missing playlistId parameter"
        });
    }

    if (!cookie) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized"
        });
    }

    if (!uris) {
        return NextResponse.json({
            status: 400,
            message: "Missing uris parameter"
        });
    }

    const url = `${baseUrl}/playlists/${playlist_id}/tracks `;

    const addTracks = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${cookie?.value}`
        },
        body: JSON.stringify({
            uris,
            "position": 0
        })
    });

    addTracks.json();

    if (addTracks.status !== 201) {
        return NextResponse.json({
            status: 500,
            message: addTracks.statusText
        });
    }

    return NextResponse.json({
        status: 200,
        message: "Playlist created successfully"
    });

}
