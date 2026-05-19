"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Searchbar from "@/app/components/Searchbar";
import BookCard from "../components/BookCard";
import Sidebar from "@/app/components/Sidebar";
import Modal from "@/app/components/Modal";
import Auth from "@/app/components/Auth";
import Image from "next/image";
import settings from "../assets/login.png";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";

const Page = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [searchResults, setSearchResults] = useState([]);
  const isLoggedIn = "";
  // mode !== "login" && mode !== "signup"
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      const ref = doc(db, "users", user.uid);

      try {
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setSubscription(snap.data().subscription?.plan ?? "basic");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  {
    /* SKELETON LOADING */
  }
  if (loading) {
    return (
      <>
        <div
          className="skeleton"
          style={{ width: "160px", height: "24px", marginBottom: "12px" }}
        ></div>
        <div
          className="skeleton"
          style={{ width: "280px", height: "24px", marginBottom: "32px" }}
        ></div>
        <div
          className="skeleton"
          style={{ width: "160px", height: "24px", marginBottom: "12px" }}
        ></div>
        <div
          className="skeleton"
          style={{ width: "280px", height: "24px" }}
        ></div>
        ;
      </>
    );
  }

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
                  <div className="settings__wrapper">

                    {user ? (
                      <>
                        <div className="section__title page__title">
                          Settings
                        </div>

                        <div className="setting__content">
                          <div className="settings__sub--title">
                            Your Subscription plan
                          </div>
                          <div className="settings__text">{subscription}</div>
                        </div>

                        <div className="setting__content">
                          <div className="settings__sub--title">Email</div>
                          <div className="settings__text">{user.email}</div>
                        </div>
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
                    
                    {subscription === "basic" && (
                      <button
                        className="btn"
                        onClick={() => router.push("/choose-plan")}
                      >
                        Upgrade to Premium
                      </button>
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
};

export default Page;
