"use client";

import useAudioContext from "../context/useAudioContext";

export default function BookCard({ book }) {
  const duration = useAudioContext(book.audioLink);

  const formatDuration = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0 min 0 secs";
        const minutes = Math.floor(seconds / 60);
        const seconds = Math.floor(seconds % 60);
        return `${minutes} min ${seconds} secs`;
  };

  return (
    <div className="book">

      <img src={book.imageLink} className="book__img" />

      <div className="book__info">
        <div className="book__title">{book.title}</div>
        <div className="book__author">{book.author}</div>

        <div className="book__meta">
          <span>{formatDuration(duration)}</span>
          <span>{book.rating}</span>
        </div>
      </div>
    </div>
  );
}
