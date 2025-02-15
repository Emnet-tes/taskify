"use client";
import { createContext, useContext, useEffect, useState } from "react";

type theme = "light" | "dark";

type ThemeContextType = {
  theme: theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<theme>("light");

  useEffect(() => {
    // Check if we're on the client-side
    if (typeof window !== "undefined") {
      // Get the theme from localStorage if available
      const savedTheme = localStorage.getItem("theme") as theme;
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // If no theme is saved, set default to light
        setTheme("light");
      }
    }
  }, []); // Empty array ensures this runs only once when the component mounts

  useEffect(() => {
    // Set the theme in document attribute and localStorage only on the client-side
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default useTheme;
