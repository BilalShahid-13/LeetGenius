import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    async function loadTheme() {
      try {
        const storedTheme = (await browser.storage.local.get(storageKey)) as {
          [key: string]: Theme;
        };
        if (storedTheme[storageKey]) {
          setTheme(storedTheme[storageKey]);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    }

    loadTheme();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    const appliedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    root.classList.add(appliedTheme);
  }, [theme]);

  async function updateTheme(newTheme: Theme) {
    if (theme === newTheme) return; // Prevent unnecessary updates

    try {
      localStorage.setItem(storageKey, newTheme);
      await browser.storage.local.set({ [storageKey]: newTheme });
      setTheme(newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
