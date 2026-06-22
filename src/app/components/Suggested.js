"use client";

import { useEffect, useState } from "react";
import BookSkeleton from "./BookSkeleton";
import BookCard from "./BookCard";

export default function Suggested() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestedBooks() {
      try {
        const response = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
        );
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching suggested books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestedBooks();
  }, []);

  return (
    <>
      <div className="for-you__title">Suggested Books</div>
      <div className="for-you__sub--title">Browse those books</div>

      {/* SKELETON LOADING */}
      {loading && (
        <div className="recommended__books--skeleton-wrapper">
          {[...Array(5)].map((_, index) => (
            <BookSkeleton key={index} />
          ))}
        </div>
      )}

      {/* SUGGESTED BOOKS */}
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
