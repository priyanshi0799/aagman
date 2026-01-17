import React from "react";
import styles from "./Loading.module.css";

export const Loading: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={`${styles.loadingBar} ${styles.loadingBar1}`} />
      <div className={`${styles.loadingBar} ${styles.loadingBar2}`} />
      <div className={`${styles.loadingBar} ${styles.loadingBar3}`} />
    </div>
  );
};
