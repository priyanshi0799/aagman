import React from "react";
import styles from "./Divider.module.css";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
}) => {
  return (
    <div
      className={
        orientation === "horizontal" ? styles.horizontal : styles.vertical
      }
    />
  );
};
