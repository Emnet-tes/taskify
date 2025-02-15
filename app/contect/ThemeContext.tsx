'use client';
import { createContext, use, useEffect, useState } from "react";

type theme = "light" | "dark" ;

type ThemeContextType = {
    theme: theme;
    toggleTheme: () => void;
    };

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<theme>(localStorage.getItem("theme") as theme || "light");

    useEffect(() => {document.documentElement.setAttribute("data-theme",theme);
    localStorage.setItem("theme",theme);
    },[theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

const useTheme = () => {
    const context = use(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export default useTheme;