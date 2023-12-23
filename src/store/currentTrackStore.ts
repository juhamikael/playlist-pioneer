import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TTrack } from "@/types/spotify";

interface CurrentTrackState {
    currentTrack: TTrack | null;
    setCurrentTrack: (currentTrack: TTrack) => void;
}

export const useCurrentTrackStore = create<CurrentTrackState>()(
    persist(
        set => ({
            currentTrack: null,
            setCurrentTrack: (currentTrack) => set({ currentTrack }),
        }),
        {
            name: 'current-track-store',
        }
    )
);
