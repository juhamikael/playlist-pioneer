// app/providers.tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUser } from '@clerk/nextjs';
import { useCookieStore } from '@/store/cookieStore';

if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false
    })
}

export function PostHogPageview(): JSX.Element {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { user, isLoaded, isSignedIn } = useUser();
    const { acceptedAnalytics } = useCookieStore(state => state)
    useEffect(() => {
        if (acceptedAnalytics && pathname) {
            let url = window.origin + pathname;
            if (searchParams && searchParams.toString()) {
                url += `?${searchParams.toString()}`;
            }
            posthog.capture("$pageview", {
                $current_url: url,
                $user_id: user?.id,
            });
        }
    }, [pathname, searchParams, isLoaded, isSignedIn, user?.id, acceptedAnalytics]);

    return <></>;
}

export function PHProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}