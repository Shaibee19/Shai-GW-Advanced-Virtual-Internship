"use client";

import Image from "next/image";
import logo from "../../assets/logo.png";
import Searchbar from "@/app/components/Searchbar";
import Sidebar from "@/app/components/Sidebar";
import { useEffect, useState } from "react";

export default function BookPage({ id }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <div className="search__background">
            <div className="search__wrapper">
              <figure>
                <Image src={logo} alt="logo" />
              </figure>
              <div className="search__content">
                <Searchbar />
                <div className="sidebar__toggle--btn">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="0"
                    viewBox="0 0 15 15"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Sidebar />
          <div className="row">
            <audio></audio>
            <div className="container">
              <div className="book__page">
                <div className="book__page--left">
                  <h1 className="book__title">{book.title}</h1>
                  <h2 className="book__author">{book.author}</h2>

                  <div className="book__rating">
                    ⭐ {book.averageRating} ({book.totalRating} ratings)
                  </div>

                  <div className="book__actions">
                    <button className="btn book__btn--read">Read</button>
                    <button className="btn book__btn--listen">Listen</button>
                    <button className="btn book__btn--library">
                      Add to Library
                    </button>
                  </div>

                  <div className="book__tags">
                    {book.tags.map((tag) => (
                      <span key={tag} className="book__tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="book__section-title">What's it about?</div>
                  <p className="book__description">{book.bookDescription}</p>

                  <div className="book__section-title">About the author</div>
                  <p className="book__description">{book.authorDescription}</p>

                  <div className="book__section-title">Key ideas</div>
                  <div className="book__keyideas">
                    {book.keyIdeas.map((idea, index) => (
                      <details key={index} className="keyidea">
                        <summary className="keyidea__title">
                          {idea.title}
                        </summary>
                        <p className="keyidea__text">{idea.text}</p>
                      </details>
                    ))}
                  </div>
                </div>

                <div className="book__page--right">
                  <figure className="book__image--wrapper-large">
                    <img
                      src={book.imageLink}
                      alt={book.title}
                      className="book__image-large"
                    />
                  </figure>

                  <audio
                    controls
                    src={book.audioLink}
                    className="book__audio"
                  ></audio>

                  {book.subscriptionRequired && (
                    <div className="premium-pill">Premium</div>
                  )}
                </div>
              </div>
            </div>
            <div className="inner__book--skeleton">
              <div className="inner__book--skeleton-content">
                <div
                  className="skeleton"
                  style={{
                    width: "70%",
                    height: "32px",
                    marginBottom: "16px",
                  }}
                ></div>
                <div
                  className="skeleton"
                  style={{
                    width: "40%",
                    height: "32px",
                    marginBottom: "16px",
                  }}
                ></div>
                <div
                  className="skeleton"
                  style={{
                    width: "100%",
                    height: "32px",
                    marginBottom: "16px",
                  }}
                ></div>
                <div
                  className="skeleton"
                  style={{
                    width: "45%",
                    height: "64px",
                    marginBottom: "16px",
                  }}
                ></div>
                <div
                  className="skeleton"
                  style={{
                    width: "50%",
                    height: "32px",
                    marginBottom: "16px",
                  }}
                ></div>
                <div
                  className="skeleton"
                  style={{
                    width: "20%",
                    height: "32px",
                    marginBottom: "16px",
                  }}
                ></div>
                <div
                  className="skeleton"
                  style={{
                    width: "50%",
                    height: "64px",
                    marginBottom: "16px",
                  }}
                ></div>
                <div
                  className="skeleton"
                  style={{
                    width: "80%",
                    height: "180px",
                    marginBottom: "16px",
                  }}
                ></div>
                <div
                  className="skeleton"
                  style={{ width: "80%", height: "268px" }}
                ></div>
              </div>
              <div className="inner__book--skeleton-img">
                <div
                  className="skeleton"
                  style={{
                    width: "300px",
                    height: "300px",
                    marginBottom: "16px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
