"use client";

import { createContext, useContext, useState } from "react";

const FontSizeContext = createContext();

export function FontSizeProvider({ children }) {
  const [fontSize, setFontSize] = useState("medium"); // default

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  return useContext(FontSizeContext);
}
