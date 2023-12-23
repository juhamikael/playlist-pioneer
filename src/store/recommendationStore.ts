import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TTrack as TRecommendations } from "@/types/spotify";

interface RecommendationsState {
    recommendations: TRecommendations[];
    setRecommendations: (recommendations: TRecommendations[]) => void;
}

export const useRecommendationsStore = create<RecommendationsState>()(
    persist(
        set => ({
            recommendations: [],
            setRecommendations: (recommendations) => set({ recommendations }),
        }),
        {
            name: 'recommendations-store',
        }
    )
);
