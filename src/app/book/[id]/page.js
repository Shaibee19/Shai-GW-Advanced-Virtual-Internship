"use client";

import Searchbar from "@/app/components/Searchbar";
import Sidebar from "@/app/components/Sidebar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BookPage() {
  const { id } = useParams();
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
          <div className="page__layout">
            <Sidebar />

            <div className="page__content">
              <Searchbar />

              <div className="row">
                <audio></audio>
                <div className="container">
                  <div className="book__wrapper">
                    <div className="book__page">
                      <div className="book__page--left">
                        <h1 className="book__title">{book.title}</h1>
                        <h2 className="book__author">{book.author}</h2>

                        <div className="book__rating">
                          ⭐ {book.averageRating} ({book.totalRating} ratings)
                        </div>

                        <div className="book__actions">
                          <button className="btn book__btn--read">Read</button>
                          <button className="btn book__btn--listen">
                            Listen
                          </button>
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

                        <div className="book__section-title">
                          What's it about?
                        </div>
                        <p className="book__description">
                          {book.bookDescription}
                        </p>

                        <div className="book__section-title">
                          About the author
                        </div>
                        <p className="book__description">
                          {book.authorDescription}
                        </p>

                        <div className="book__section-title">Key ideas</div>
                        <div className="book__keyideas">
                          {book.tags.map((idea, index) => (
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

          </div>
        </div>
      </div>
    </>
  );
}
