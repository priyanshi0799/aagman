import React from "react";
import styles from "./Chip.module.css";

interface ChipProps {
  label: string;
  onClick?: () => void;
  isSelected?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  onClick,
  isSelected = false,
}) => {
  return (
    <button
      className={`${styles.chip} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
