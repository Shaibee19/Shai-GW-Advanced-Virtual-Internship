import React, { useState, useRef, useEffect } from "react";
import { RiReplay10Fill, RiForward10Line } from "react-icons/ri";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useAuth } from "@/app/context/AuthContext";

export default function AudioPlayer({ book }) {
  // State variables
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5); // Default volume

  // Ref for the audio element
  const audioRef = useRef(null);

  // Function to toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Skip 10 seconds
  const skipForward = () => {
    audioRef.current.currentTime = Math.min(
      audioRef.current.currentTime + 10,
      duration,
    );
  };

  const skipBackward = () => {
    audioRef.current.currentTime = Math.max(
      audioRef.current.currentTime - 10,
      0,
    );
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
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

   // Seek
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  // Mark book as finished when audio ends
  const { user } = useAuth();

  useEffect(() => {
    if (!audioRef.current || !user || !book) return; // prevents the crash

    audioRef.current.onended = async () => {
      try {
      console.log("Audio finished!");
      const ref = doc(db, "users", user.uid);

      await updateDoc(ref, {
        finished: arrayUnion({
          id: book.id,
          title: book.title,
          author: book.author,
          imageLink: book.imageLink,
          duration: duration,
          rating: book.averageRating,
        }),
      });
    } catch (error) {
      console.error("Error updating finished books:", error);
    }
    };
  }, [audioRef.current, user, book, duration]);

  return (
    <div className="audio__wrapper">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={book.audioLink}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Track Info */}
      <div className="audio__track--wrapper">
        <figure className="audio__track--image-mask">
          <figure
            className="book__image--wrapper"
            style={{
              height: "48px",
              width: "48px",
              minWidth: "48px",
            }}
          >
            <img
              className="book__image"
              src={book.imageLink}
              alt={book.title}
              style={{ display: "block" }}
            />
          </figure>
        </figure>

        <div className="audio__track--details-wrapper">
          <div className="audio__track--title">{book.title}</div>
          <div className="audio__track--author">{book.author}</div>
        </div>
      </div>
      {/* <div>
        <button>{isPlaying ? "Pause" : "Play"}</button>
        <span>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div> */}

      {/* Controls */}
      <div className="audio__controls--wrapper">
        <div className="audio__controls">

          {/* Back 10 */}
          <button className="audio__controls--btn" onClick={skipBackward}>
           <RiReplay10Fill />
          </button>

          {/* Play / Pause */}
          <button
            className="audio__controls--btn audio__controls--btn-play"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
              >
                <path d="M6 4h4v16H6zM14 4h4v16h-4z"></path>
              </svg>
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
              >
                <path d="M96 448l320-192L96 64v384z"></path>
              </svg>
            )}
          </button>

          {/* Forward 10 */}
          <button className="audio__controls--btn" onClick={skipForward}>
            <RiForward10Line />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="audio__progress--wrapper">
        <div className="audio__time">{formatTime(currentTime)}</div>

        <input
          className="audio__progress--bar"
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          style={{ "--range-progress": `${progressPercent}%` }}
        />

        <div className="audio__time">{formatTime(duration)}</div>
      </div>

      {/* Volume */}
      {/* <div className="audio__volume--wrapper">
        <input
          type="range"
          min="0"
          max="1"
          step="0.02"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div> */}
    </div>
  );
}
