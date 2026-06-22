"use client";

import { useEffect, useState } from "react";
import BookSkeleton from "./BookSkeleton";
import BookCard from "./BookCard";

export default function Recommended({}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendedBooks() {
      try {
        const response = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
        );
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendedBooks();
  }, []);

  return (
    <>
      <div className="for-you__title">Recommended For You</div>
      <div className="for-you__sub--title">We think you’ll like these</div>

      {/* SKELETON LOADING */}
      {loading && (
        <div className="recommended__books--skeleton-wrapper">
          {[...Array(5)].map((_, index) => (
            <BookSkeleton key={index} />
          ))}
        </div>
      )}

      {/* RECOMMENDED BOOKS */}
      {!loading && (
        <div className="for-you__recommended--books">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </>
  );
}
