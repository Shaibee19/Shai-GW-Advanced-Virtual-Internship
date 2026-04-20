"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import BookCard from "../components/BookCard";
import Selected from "../components/Selected";
import Recommended from "../components/Recommended";
import Suggested from "../components/Suggested";

const Page = () => {
  const [searchResults, setSearchResults] = useState([]);

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
              {searchResults.length > 0 && (
                <div className="search__results">
                  {searchResults.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              )}

              <div className="row">
                <div className="container">
                  <div className="for-you__wrapper">
                    <Selected />
                    <Recommended />
                    <Suggested />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
