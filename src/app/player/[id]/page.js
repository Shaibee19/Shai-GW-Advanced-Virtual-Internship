"use client";

import Searchbar from "../../components/Searchbar";
import Sidebar from "@/app/components/Sidebar";
import AudioPlayer from "@/app/components/AudioPlayer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useFontSize } from "@/app/context/FontSizeContext";
import BookCard from "@/app/components/BookCard";

export default function BookSummary() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { fontSize } = useFontSize();

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
        );
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) return <div className="inner__book--skeleton">Loading…</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <>
      <div id="__next">
        <div className="wrapper">
          <div className="page__layout">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              onLoginClick={() => {
                setAuthMode("login");
                setIsAuthModalOpen(true);
              }}
            />

            <div className="page__content">
              <Searchbar 
                onToggleSidebar={() => setSidebarOpen(true)} 
                onResults={setSearchResults} 
              />
              {searchResults.length > 0 && (
                <div className="search__results">
                  {searchResults.map((book) => (
                    <BookCard key={book.id || index} book={book} />
                  ))}
                </div>
              )}

              <div className="row">
                <div className="container">
                  <div className="summary">
                    <div
                      className="audio__book--summary"
                      style={{ fontSize: "16px" }}
                    >
                      <div className="audio__book--summary-title">
                        <b>{book.title}</b>
                      </div>
                      <div className={`audio__book--summary-text player__summary player__summary--${fontSize}`}>
                        {book.summary}
                      </div>
                    </div>

                      <AudioPlayer book={book} />
                      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
