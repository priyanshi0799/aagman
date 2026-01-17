import React from "react";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  description: string;
  illustration?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  illustration,
  action,
}) => {
  return (
    <div className={styles.emptyState}>
      {illustration && (
        <div className={styles.illustration}>{illustration}</div>
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </div>
  );
};
