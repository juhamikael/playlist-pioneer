"use client"
import React, { useState, useEffect, useRef, useContext, FC } from 'react';
import { PlayCircle as Play, PauseCircle as Pause } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useAudioPlayerStore } from "@/store/audioPlayerStore"
type CanvasProgressCircleProps = {
    progress: number;
    width: number;
    height: number;
    style?: React.CSSProperties;
};
const CanvasProgressCircle: FC<CanvasProgressCircleProps> = ({ progress, width, height, style }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && canvas.getContext) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const centerX = width / 2;
                const centerY = height / 2;
                const radius = width / 2 - 10; // Radius of progress circle
                ctx.clearRect(0, 0, width, height); // Clear canvas
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Background circle
                ctx.strokeStyle = '#e6e6e6';
                ctx.lineWidth = 10;
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, -Math.PI / 2, (2 * Math.PI * progress) / 100 - Math.PI / 2); // Progress arc
                ctx.strokeStyle = '#84cc16';
                ctx.stroke();
            }
        }
    }, [progress, width, height]);

    return <canvas ref={canvasRef} width={width} height={height} style={style} />;
};

type AudioPlayerProps = {
    audioSrc: string;
    imageSrc: string;
    bookMarkPlayer?: boolean;
};

const AudioPlayer: FC<AudioPlayerProps> = ({ audioSrc, imageSrc, bookMarkPlayer }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const { playingSrc, setPlayingSrc, volume, setStop } = useAudioPlayerStore(state => state)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        // Audio is instantiated here to ensure it's only done on the client side
        audioRef.current = new Audio(audioSrc);

        const currentAudioRef = audioRef.current;

        const handleTimeUpdate = () => {
            if (currentAudioRef) {
                const progress = (currentAudioRef.currentTime / currentAudioRef.duration) * 100;
                setProgress(progress);
            }
        };

        if (currentAudioRef) {
            currentAudioRef.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (currentAudioRef) {
                currentAudioRef.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, [audioSrc]);

    const togglePlayPause = () => {

        setIsPlaying(!isPlaying);
        if (audioRef.current) {
            if (!isPlaying) {
                setPlayingSrc(audioSrc);
                audioRef.current.play();
                audioRef.current.currentTime = 0;
            } else {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    };


    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            if (audioSrc !== playingSrc && isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                }
            };
        }
    }, [playingSrc, audioSrc, isPlaying]);

    const playButtonStyle = "h-14 w-14 text-[#e6e6e6] drop-shadow-xl ";
    const multiplier = bookMarkPlayer ? 0.7 : 1;
    return (
        <div className="relative" style={{
            width: bookMarkPlayer ? '100px' : '140px',
            height: bookMarkPlayer ? '100px' : '140px',
        }}>
            <div className='flex items-center justify-center'>
                <CanvasProgressCircle progress={progress} width={140 * multiplier} height={140 * multiplier} style={{ zIndex: 10 }} />

                <Image
                    className={cn("rounded-full cursor-pointer text-green-600", isPlaying && "animate-spin-slow ")}
                    src={imageSrc}
                    alt=""
                    width={110 * multiplier}
                    height={110 * multiplier}
                    onClick={togglePlayPause}
                    style={{ position: 'absolute', zIndex: 20 }}
                />
                <div
                    onClick={togglePlayPause}
                    className="absolute transform z-30 cursor-pointer">
                    {isPlaying ? <Pause className={playButtonStyle} /> : <Play className={playButtonStyle} />}
                </div>
            </div>

        </div>
    );
};

export default AudioPlayer;
