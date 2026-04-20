"use client";

import { useState } from "react";
import Searchbar from "@/app/components/Searchbar";
import Sidebar from "@/app/components/Sidebar";
import Image from "next/image";
import settings from "../assets/login.png";

const Page = (mode, setMode) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
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

              <div className="row">
                <div className="container">
                  <div className="settings__wrapper">
                    {mode === "login" ? (
                      <>
                        <div className="section__title page__title">
                          Settings
                        </div>
                        <div className="setting__content">
                          '
                          <div className="settings__sub--title">
                            Your Subscription plan
                          </div>
                          <div className="settings__text">premium-plus</div>
                        </div>
                        <div className="setting__content">
                          <div className="settings__sub--title">Email</div>
                          <div className="settings__text">hanna@gmail.com</div>
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
                          >
                            Login
                          </button>
                        </div>
                      </>
                    )}

                    {/* SKELETON LOADING */}
                    <div
                      className="skeleton"
                      style={{
                        width: "160px",
                        height: "24px",
                        marginBottom: "12px",
                      }}
                    ></div>
                    <div
                      className="skeleton"
                      style={{
                        width: "280px",
                        height: "24px",
                        marginBottom: "32px",
                      }}
                    ></div>
                    <div
                      className="skeleton"
                      style={{
                        width: "160px",
                        height: "24px",
                        marginBottom: "12px",
                      }}
                    ></div>
                    <div
                      className="skeleton"
                      style={{ width: "280px", height: "24px" }}
                    ></div>
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
