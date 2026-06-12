"use client"

import { useEffect, useState } from "react"

export default function useAudioContext(audioUrl) {
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        if (!audioUrl) return;

        const audio = new Audio();
        audio.preload = "metadata";

        const onLoadedMetadata = () => {
            setDuration(audio.duration);
        };

            audio.addEventListener("loadedmetadata", onLoadedMetadata);
            audio.src = audioUrl;

            return () => {
                audio.removeEventListener("loadedmetadata", onLoadedMetadata);
                audio.src = ""; // cancels the metadata fetch on unmount
            };
        }, [audioUrl]);

        return duration
    };