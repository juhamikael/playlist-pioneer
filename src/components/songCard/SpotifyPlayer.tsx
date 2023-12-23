import { cn } from "@/lib/utils";

const SpotifyPlayer = (
    {
        id,
        height = 152,
        customWidth = false
    }: {
        id: string,
        height?: 152 | 80,
        customWidth?: boolean
    }
) => {
    return (
        <iframe
            src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
            height={height}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className={cn(
                customWidth ? "w-[60%]" : "w-full",
            )}
        />

    );
};

export default SpotifyPlayer;
