"use client";

import { AudioContext } from "../context/AudioContext";

export default function BookCard({ book }) {
  const duration = AudioContext(book.audioLink);

  return (
    <div className="book">

      <img src={book.imageLink} className="book__img" />

      <div className="book__info">
        <div className="book__title">{book.title}</div>
        <div className="book__author">{book.author}</div>

        <div className="book__meta">
          <span>{duration}</span>
          <span>{book.rating}</span>
        </div>
      </div>
    </div>
  );
}
