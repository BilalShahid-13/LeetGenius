import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, useTheme } from "../components/theme-provider";
import App from "./App";

const Root = () => {
  const { theme, setTheme } = useTheme(); // Get theme from provider

  useEffect(() => {
    async function fetchTheme() {
      try {
        const storedTheme = await browser.storage.local.get("vite-ui-theme");
        if (storedTheme["vite-ui-theme"]) {
          setTheme(storedTheme["vite-ui-theme"]); // Sync with theme provider
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    }

    fetchTheme();

    // Listen for changes in browser storage and sync with state
    function handleStorageChange(changes) {
      if (changes["vite-ui-theme"]) {
        setTheme(changes["vite-ui-theme"].newValue);
      }
    }

    browser.storage.onChanged.addListener(handleStorageChange);
    return () => {
      browser.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [setTheme]);

  return <App />;
};

// Ensure sidebar-root exists before rendering
const rootElement = document.getElementById("sidebar-root");
if (rootElement) {
  createRoot(rootElement).render(
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}
