import React from "react";
import styles from "./Logo.module.css";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  text?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = false,
  text,
}) => {
  const dimensions = size === "sm" ? 16 : size === "lg" ? 32 : 24;

  return (
    <div className={styles.logoWrap}>
      <div className={styles.logoIcon}>
        <svg
          width={dimensions}
          height={dimensions}
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect width="24" height="24" rx="5.71" fill="#19E299" />
          <path
            d="M6 4.5L12 19.5L18 4.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showText && text && <span className={styles.logoText}>{text}</span>}
    </div>
  );
};
