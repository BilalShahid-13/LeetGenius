import React, { Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, useTheme } from "../components/theme-provider";

// Lazy load App
const App = React.lazy(() => import("./App"));

const Root = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    async function fetchTheme() {
      try {
        const storedTheme = await browser.storage.local.get("vite-ui-theme");
        if (storedTheme["vite-ui-theme"]) {
          setTheme(storedTheme["vite-ui-theme"]);
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    }

    fetchTheme();

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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  );
};

const rootElement = document.getElementById("sidebar-root");
if (rootElement) {
  createRoot(rootElement).render(
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  );
}
