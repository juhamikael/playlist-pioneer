import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TTokenState {
    token: string;
    setToken: (token: string) => void;
}

export const useTokenStore = create<TTokenState>()(
    persist(
        set => ({
            token: '',
            setToken: (token) => set({ token }),
        }),
        {
            name: 'spotify-token-store',
            getStorage: () => sessionStorage,
        }
    )
);