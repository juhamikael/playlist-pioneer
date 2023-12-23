import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface UserState {
    spotifyUserId: string | null;
    setSpotifyUserId: (spotifyUserId: string) => void;
    prefferedPlayer: "spotify" | "custom";
    setPrefferedPlayer: (prefferedPlayer: "spotify" | "custom") => void;
    noPreviewTooltipText: "explain" | "short";
    setNoPreviewTooltipText: (noPreviewTooltipText: "explain" | "short") => void;
}

export const useUserStore = create<UserState>()(
    persist(
        set => ({
            spotifyUserId: null,
            setSpotifyUserId: (spotifyUserId) => set({ spotifyUserId }),
            prefferedPlayer: "custom",
            setPrefferedPlayer: (prefferedPlayer) => set({ prefferedPlayer }),
            noPreviewTooltipText: "explain",
            setNoPreviewTooltipText: (noPreviewTooltipText) => set({ noPreviewTooltipText }),
        }),
        {
            name: 'user-store',
        }
    )
);
