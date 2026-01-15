import React from "react";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onThemeChange,
}) => {
  return (
    <div className={styles.themeSwitch}>
      <button
        className={`${styles.themeOption} ${
          theme === "light" ? styles.themeActive : ""
        }`}
        onClick={() => onThemeChange("light")}
      >
        <span>Light</span>
      </button>
      <button
        className={`${styles.themeOption} ${
          theme === "dark" ? styles.themeActive : ""
        }`}
        onClick={() => onThemeChange("dark")}
      >
        <span>Dark</span>
      </button>
    </div>
  );
};
