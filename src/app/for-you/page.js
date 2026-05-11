"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import BookCard from "../components/BookCard";
import Selected from "../components/Selected";
import Recommended from "../components/Recommended";
import Suggested from "../components/Suggested";
import Modal from "../components/Modal";
import Auth from "../components/Auth";

const Page = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  return (
    <>
      <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}>
        <Auth
          onClose={() => setIsAuthModalOpen(false)}
          mode={authMode}
          setMode={setAuthMode}
        />
      </Modal>
      
      <div id="__next">
        <div className="wrapper">
          <div className="page__layout">
            <Sidebar
              onLoginClick={() => {
                setAuthMode("login");
                setIsAuthModalOpen(true);
              }}
            />

            <div className="page__content">
              <Searchbar onResults={setSearchResults} />
              {searchResults.length > 0 && (
                <div className="search__results">
                  {searchResults.map((book) => (
                    <BookCard key={book.id || index} book={book} />
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
