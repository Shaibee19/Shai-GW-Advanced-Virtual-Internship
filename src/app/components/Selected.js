"use client";

import { useEffect, useState } from "react";

export default function Selected() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSelectedBook() {
      try {
        const response = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        );
        const data = await response.json();
        console.log(data)
        setBook(data[0]);
      } catch (error) {
        console.error("Error fetching selected book:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSelectedBook();
  }, []);


  return (
    <>
      <div className="for-you__title">Selected just for you</div>

      {/* SKELETON LOADING */}
      {loading && (
      <div className="selected__book--skeleton"></div>
      )}

      {/* SELECTED BOOK */}
      {!loading && book && (
        <a className="selected__book" href={`/book/${book.id}`}>
        <audio src={book.audioLink}></audio>
        <div className="selected__book--sub-title">
          {book.subTitle}
        </div>
        <div className="selected__book--line"></div>
        <div className="selected__book--content">
          <figure
            className="book__image--wrapper"
            style={{ height: "140px", width: "140px", minWidth: "140px" }}
          >
            <img
              className="book__image"
              src={book.imageLink}
              alt={book.title}
              style={{ display: "block" }}
            />
          </figure>
          <div className="selected__book--text">
            <div className="selected__book--title">{book.title}</div>
            <div className="selected__book--author">{book.author}</div>
            <div className="selected__book--duration-wrapper">
              <div className="selected__book--icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                </svg>
              </div>

              {/* Duration */}
              <div className="selected__book--duration">{book.duration}</div>
            </div>
          </div>
        </div>

        {/* PREMIUM PILL */}
        {book.subscriptionRequired && (
          <div className="premium-pill">{book.subscriptionRequired}</div>
        )}
      </a>
      )}
    </>
  );
}
