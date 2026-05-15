"use client";

import Searchbar from "@/app/components/Searchbar";
import Sidebar from "@/app/components/Sidebar";
import BookCard from "@/app/components/BookCard";
import Modal from "../components/Modal";
import Auth from "../components/Auth";
import Image from "next/image";
import settings from "../assets/login.png";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Library() {
  const { user } = useAuth();
  const [savedBooks, setSavedBooks] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

    // const saved = JSON.parse(localStorage.getItem("savedBooks")) || [];
    // const finished = JSON.parse(localStorage.getItem("finishedBooks")) || [];

    // setSavedBooks(saved);
    // setFinishedBooks(finished);
    useEffect(() => {
      if (!user) {
        setLoading(false);
        return;
      }
      const fetchLibrary = async () => {
        try {
          const ref = doc(db, "users", user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const userData = snap.data();
            setSavedBooks(userData.library || []);
            setFinishedBooks(userData.finished || []);
          }
        } catch (error) {
          console.error("Error fetching library:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchLibrary();
    }, [user]);

  // if (!user) {
  //   return (
  //     <div className="page__content">
  //       <p>Please log in to view your library.</p>
  //     </div>
  //   );
  // }
    
  /* SKELETON LOADING */
  if (loading)
    return (
      <div className="recommended__books--skeleton-wrapper">
        <div className="recommended__books--skeleton">
          <div className="skeleton" style={{ width: "100px", height: "20px", marginBottom: "24px" }}></div>
          <div className="skeleton" style={{ width: "100%", height: "240px", marginBottom: "8px", }}></div>
          <div className="skeleton" style={{ width: "100%", height: "20px", marginBottom: "8px", }}></div>
          <div className="skeleton" style={{ width: "90%", height: "16px", marginBottom: "8px", }}></div>
          <div className="skeleton" style={{ width: "80%", height: "32px", marginBottom: "8px", }}></div>
          <div className="skeleton" style={{ width: "90%", height: "16px", marginBottom: "8px", }}></div>
        </div>
      </div>
    );

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
                  <div className="for-you__wrapper">

                    {user ? (
                      <>
                      {/* SAVED BOOKS */}
                      <div className="for-you__title">Saved Books</div>
                      <div className="for-you__sub--title">
                        {savedBooks.length} items
                      </div>

                      {savedBooks.length === 0 ? (
                        <p>You haven’t saved any books yet.</p>
                      ) : (
                        <div className="library__grid">
                          {savedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                          ))}
                        </div>
                      )}

                      {/* FINISHED BOOKS */}
                      <div className="for-you__title">Finished</div>
                      <div className="for-you__sub--title">
                        {finishedBooks.length} items
                      </div>
                      {finishedBooks.length === 0 ? (
                        <p>You haven’t finished any books yet.</p>
                      ) : (
                        <div className="library__grid">
                          {finishedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                          ))}
                        </div>
                      )}
                    </>
                    ) : (
                      <>
                        <div className="settings__login--wrapper">
                          <Image src={settings} alt="settings login" priority />
                          <div className="settings__login--text">
                            Log in to your account to see your details.
                          </div>

                          <button
                            className="btn settings__login--btn"
                            onClick={() => {
                              setAuthMode("login");
                              setIsAuthModalOpen(true);
                            }}
                          >
                            Login
                          </button>
                        </div>
                      </>
                      )}
                      
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
