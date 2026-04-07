"use client";

import { useEffect, useState } from "react";

export default function RotatingHeadings({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 2000); // rotates every 2 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="statistics__content--header rotating-headings">
      {items.map((text, index) => (
        <div
          key={index}
          className={`statistics__heading ${
            index === activeIndex ? "active" : ""
          }`}
        >
          {text}
        </div>
      ))}
    </div>
  );
}
