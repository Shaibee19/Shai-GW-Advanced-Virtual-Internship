"use client";

import Searchbar from "@/app/components/Searchbar";
import Sidebar from "@/app/components/Sidebar";
import AudioPlayer from "@/app/components/AudioPlayer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookSummary() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

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
            // mode={mode}
            // setMode={setMode}
            // onLoginClick={() => {
            //   setAuthMode("login");
            //   setIsAuthModalOpen(true);
            // }}
            // onLogoutClick={() => {
            //   setMode("login"); // or however you represent logged-out state
            // }}
            />

            <div className="page__content">
              <Searchbar onResults={setSearchResults} />

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
                      <div className="audio__book--summary-text">
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
