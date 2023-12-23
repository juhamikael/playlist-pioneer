import type { TTrack } from "@/types/spotify";
import { fetchSpotifyData } from "@/utils/fetchData"
import { toast } from "sonner"

const getIdFromUrl = (url: string) => {
    if (url === "") return null
    if (url !== "" && url.indexOf("https://open.spotify.com/track/") === -1) {
        return null
    }
    try {
        const siIndex = url.indexOf("?si");
        if (siIndex !== -1) {
            url = url.substring(0, siIndex);
        }
        const split = url.split("/");
        const id = split[split.length - 1];
        return id;
    } catch (error) {
        return null
    }
}

/**
 * 
 * @param setCurrentTrack - The function to set the current track
 * @param setRecommendations - The function to set the recommendations
 * @param input? - The input URL
 * @param currentTrack? - The current track 
 * @returns - Nothing but sets the current track and recommendations in the store
 * 
 * @example fetchRecommendations(currentTrack, setCurrentTrack, setRecommendations, input)
 */
export const fetchRecommendations = async (
    setCurrentTrack: (track: TTrack) => void,
    setRecommendations: (recommendations: TTrack[]) => void,
    input?: string,
    currentTrack?: TTrack | null,
) => {
    if (!input) return
    let id;
    if (input !== "" && input.indexOf("https://open.spotify.com/track/") !== -1) {
        id = getIdFromUrl(input);
    }

    if (!id) {
        toast.error("Invalid Spotify URL");
        return;
    }

    try {
        const getArtistData = await fetchSpotifyData("artists-from-track", { trackId: id });
        if (getArtistData.status === 429) {
            toast.error("Too many requests. Please try again later.");
            return;
        }

        const artistData = getArtistData.body.parsedData.artistId.replace(/\s/g, '');
        const trackId = getArtistData.body.parsedData.trackId;
        const recommendationFeatures = getArtistData.body.recommendationFeatures;
        const currentTrack = getArtistData.body.inputTrackData;

        const getRecommendations = await fetchSpotifyData("get-recommendations", { artist: artistData, track: trackId }, "POST", recommendationFeatures);
        if (getRecommendations.status === 429) {
            toast.error("Too many requests. Please try again later.");
            return;
        }

        setCurrentTrack(currentTrack);
        setRecommendations(getRecommendations.body); // Assuming this is the data you want to set
        toast.success("Enjoy your recommendations!");
    } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        toast.error("There was a problem fetching recommendations.");
    }
};