import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CookieState {
    userSeenCookieBanner: boolean;
    setUserSeenCookieBanner: (userSeenCookieBanner: boolean) => void;
    acceptedAnalytics: boolean;
    setAcceptedAnalytics: (acceptedAnalytics: boolean) => void;
}

export const useCookieStore = create<CookieState>()(
    persist(
        (set) => ({
            userSeenCookieBanner: false,
            setUserSeenCookieBanner: (userSeenCookieBanner) =>
                set(() => ({ userSeenCookieBanner })),
            acceptedAnalytics: false,
            setAcceptedAnalytics: (acceptedAnalytics) =>
                set(() => ({ acceptedAnalytics })),
        }),
        {
            name: 'cookie-keys-store',
        }
    )
);
