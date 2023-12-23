import { getCookie } from 'cookies-next';

interface Params {
    [key: string]: string | number;
}

/**
 * Fetch data from a specified Spotify endpoint with additional parameters.
 * 
 * @param endpoint - The endpoint to be called, e.g., "artists-from-track".
 * @param params - Object containing parameters for the request, e.g., { trackId: "14EcgkY4YICkFrujD1NdDp" }.
 * @param method - HTTP method for the request, default is "GET".
 * @param body - Optional body for POST requests.
 * @returns The response data from the Spotify API.
 * 
 * @example fetchData("artists-from-track", { trackId: "14EcgkY4YICkFrujD1NdDp" });
 */
export const fetchSpotifyData = async (
    endpoint: string,
    params: Params,
    method: string = "GET",
    body?: any
) => {
    const token = getCookie('spotify-access-token');

    if (!token) {
        console.error("No Spotify access token found");
        return;
    }

    try {
        const queryParams = new URLSearchParams(params as Record<string, string>);
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/${endpoint}?${queryParams.toString()}`;

        const requestOptions = {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: method !== 'GET' ? JSON.stringify(body) : null
        };

        const res = await fetch(url, requestOptions);
        const data = await res.json();
        return data;
    } catch (e) {
        console.error("Error fetching Spotify data:", e);
    }
};
