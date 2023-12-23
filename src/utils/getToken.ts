import { currentUser, clerkClient } from "@clerk/nextjs";
export const getToken = async () => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    const spotifyOAuth = await clerkClient.users.getUserOauthAccessToken(user?.id, "oauth_spotify")
    const token = spotifyOAuth[0].token

    return token;
}