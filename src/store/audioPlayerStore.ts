import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioPlayerState {
    playingSrc: string
    volume: number;
    setVolume: (volume: number) => void;
    setPlayingSrc: (playingSrc: string) => void;
    setStop: () => void;
}
export const useAudioPlayerStore = create<AudioPlayerState>()(
    persist(
        (set) => ({
            playingSrc: '',
            volume: 0.5,
            setVolume: (volume) => set(() => ({ volume })),
            setPlayingSrc: (playingSrc) => set(() => ({ playingSrc })),
            setStop: () => set(() => ({ playingSrc: '' })),
        }),
        {
            name: 'audio-player-store',
        }
    )
);


