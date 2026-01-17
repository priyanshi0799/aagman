import React from "react";
import Image from "next/image";
import { SunIcon, MoonIcon } from "@/assets/icons";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
  isCollapsed?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onThemeChange,
  isCollapsed = false,
}) => {
  // When collapsed, show image toggle
  if (isCollapsed) {
    return (
      <button
        className={styles.collapsedToggle}
        onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <Image
            src="/images/switchOn.png"
            alt="Dark mode"
            width={52}
            height={36}
          />
        ) : (
          <Image
            src="/images/switchOn.png"
            alt="Light mode"
            width={52}
            height={36}
            style={{ transform: "scaleX(-1)" }}
          />
        )}
      </button>
    );
  }

  // Default expanded view
  return (
    <div className={styles.themeSwitch}>
      <button
        className={`${styles.themeOption} ${
          theme === "light" ? styles.themeActive : ""
        }`}
        onClick={() => onThemeChange("light")}
      >
        <SunIcon />
        <span>Light</span>
      </button>
      <button
        className={`${styles.themeOption} ${
          theme === "dark" ? styles.themeActive : ""
        }`}
        onClick={() => onThemeChange("dark")}
      >
        <MoonIcon />
        <span>Dark</span>
      </button>
    </div>
  );
};
