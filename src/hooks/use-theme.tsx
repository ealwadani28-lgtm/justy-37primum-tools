import { useEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "justlator-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

// View Transitions wrapper — falls back gracefully
function withTransition(cb: () => void) {
  // @ts-expect-error startViewTransition is not yet in lib.dom
  if (typeof document !== "undefined" && document.startViewTransition) {
    // @ts-expect-error
    document.startViewTransition(() => cb());
  } else {
    cb();
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    withTransition(() => setThemeState(t));
  }, []);
  const toggleTheme = useCallback(() => {
    withTransition(() => setThemeState((p) => (p === "dark" ? "light" : "dark")));
  }, []);

  return { theme, setTheme, toggleTheme };
}
