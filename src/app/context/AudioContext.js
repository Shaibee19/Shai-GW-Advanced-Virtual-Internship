"use client"

import { useEffect, useState } from "react"

export function AudioContext(audioUrl) {
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        if (!audioUrl) return;

        const audio = new Audio();
        audio.preload = "metadata";

        const onLoadedMetadata = () =>
            setDuration(audio.duration);
            audio.addEventListener("loadedmetadata", onLoadedMetadata);
            audio.src = audioUrl;

            return () => {
                audio.removeEventListener("loadedmetadata", onLoadedMetadata);
                audio.src = ""; // cancels the metadata fetch on unmount
            };
        }, [audioUrl]);

        if (duration === null) return null;
        if (isNaN(duration) || duration === 0) return "0 min 0 secs";
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${minutes} min ${seconds} secs`;
    };