import React, { useState, useRef, useEffect } from 'react';

function AudioPlayer() {
  // State variables
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5); // Default volume

  // Ref for the audio element
  const audioRef = useRef(null);

  // Function to toggle play/pause
  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Function to handle time updates
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Function to handle audio metadata (duration)
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Function to handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // UseEffect to set the volume on component mount
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

  // Format time (e.g., 00:00)
  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <audio src="your-audio-file.mp3" />
      <div>
        <button>{isPlaying ? 'Pause' : 'Play'}</button>
        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
        
      </div>
      <div>
         {
            audioRef.current.currentTime = parseFloat(e.target.value);
            setCurrentTime(parseFloat(e.target.value));
          }}
          className="progress-bar"
        />
      </div>
    </div>
  );
}

export default AudioPlayer;
