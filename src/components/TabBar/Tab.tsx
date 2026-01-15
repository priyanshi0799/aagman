import React from "react";
import { CloseIcon } from "@/assets/icons";
import styles from "./TabBar.module.css";

interface TabProps {
  title: string;
  onClose?: () => void;
}

export const Tab: React.FC<TabProps> = ({ title, onClose }) => {
  return (
    <div className={styles.tab}>
      <div className={styles.tabTextContainer}>
        <span className={styles.tabText}>{title}</span>
      </div>
      <button className={styles.closeBtn} onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
};
