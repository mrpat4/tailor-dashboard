import { create } from "zustand";

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem("theme") || "dark",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { theme: newTheme };
    }),
}));
