import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TTrack } from "@/types/spotify";

interface BookmarkState {
    bookmarks: TTrack[];
    setBookmarks: (fn: (prevBookmarks: TTrack[]) => TTrack[]) => void;
}

export const useBookmarkStore = create<BookmarkState>()(
    persist(
        (set) => ({
            bookmarks: [],
            setBookmarks: (fn: (prevBookmarks: TTrack[]) => TTrack[]) => set((state) => ({ bookmarks: fn(state.bookmarks) })),
        }),
        {
            name: 'bookmark-store',
        }
    )
);
