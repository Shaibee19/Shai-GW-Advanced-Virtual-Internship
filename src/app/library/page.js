"use client";

import Searchbar from "@/app/components/Searchbar";
import Sidebar from "@/app/components/Sidebar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Library() {
  const [savedBooks, setSavedBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedBooks")) || [];
    const finished = JSON.parse(localStorage.getItem("finishedBooks")) || [];

    setSavedBooks(saved);
    setFinishedBooks(finished);
  }, []);

  return (
    <>
      <div id="__next">
        <div className="wrapper">
          <div className="page__layout">
            <Sidebar
              mode={mode}
              setMode={setMode}
              onLoginClick={() => {
                setAuthMode("login");
                setIsAuthModalOpen(true);
              }}
              onLogoutClick={() => {
                setMode("login"); // or however you represent logged-out state
              }}
            />

            <div className="page__content">
              <Searchbar onResults={setSearchResults} />

              <div className="row">
                <div className="container">
                  <div className="for-you__wrapper">
                    <div className="for-you__title">Saved Books</div>
                    <div className="for-you__sub--title">2 items</div>
                    {savedBooks.length === 0 ? (
                      <p>You haven’t saved any books yet.</p>
                    ) : (
                      <div className="library__grid">
                        {savedBooks.map((book) => (
                          <BookCard key={book.id} book={book} />
                        ))}
                      </div>
                    )}
                    <div className="for-you__title">Finished</div>
                    <div className="for-you__sub--title">13 items</div>
                    {finishedBooks.length === 0 ? (
                      <p>You haven’t finished any books yet.</p>
                    ) : (
                      <div className="library__grid">
                        {finishedBooks.map((book) => (
                          <BookCard key={book.id} book={book} />
                        ))}
                      </div>
                    )}

                    {/* SKELETON LOADING */}
                    <div
                      className="skeleton"
                      style={{
                        width: "100px",
                        height: "20px",
                        marginBottom: "24px",
                      }}
                    ></div>
                    <div className="recommended__books--skeleton-wrapper">
                      <div className="recommended__books--skeleton">
                        <div
                          className="skeleton"
                          style={{
                            width: "100%",
                            height: "240px",
                            marginBottom: "8px",
                          }}
                        ></div>
                        <div
                          className="skeleton"
                          style={{
                            width: "100%",
                            height: "20px",
                            marginBottom: "8px",
                          }}
                        ></div>
                        <div
                          className="skeleton"
                          style={{
                            width: "90%",
                            height: "16px",
                            marginBottom: "8px",
                          }}
                        ></div>
                        <div
                          className="skeleton"
                          style={{
                            width: "80%",
                            height: "32px",
                            marginBottom: "8px",
                          }}
                        ></div>
                        <div
                          className="skeleton"
                          style={{
                            width: "90%",
                            height: "16px",
                            marginBottom: "8px",
                          }}
                        ></div>
                      </div>
                    </div>
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
