import { Palette } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function DarkMode() {
  const { theme, setTheme } = useTheme();
  console.log(theme)

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-center items-center gap-4">
          <Palette />
          <label htmlFor="darkModeToggle" className="font-montserrat font-medium">
            Toggle Themes
          </label>
        </div>
        <label
          htmlFor="darkModeToggle"
          className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 dark:bg-gray-600 transition-all"
        >
          <input
            type="checkbox"
            id="darkModeToggle"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="peer sr-only"
          />

          <span
            className="absolute inset-y-0 start-0 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-400 transition-all peer-checked:start-6 peer-checked:text-yellow-500"
          >
            {theme === "dark" ? (
              <img src="/icons/night.svg" width={17} alt="Dark Mode Icon" />
            ) : (
              <img src="/icons/sun.svg" width={17} alt="Light Mode Icon" />
            )}
          </span>
        </label>
      </div>

    </>
  );
}
