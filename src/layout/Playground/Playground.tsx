import React from "react";
import { EmptyState } from "@/components/EmptyState";
import { PlaygroundIcon } from "@/assets/icons";
import styles from "./Playground.module.css";

export const Playground: React.FC = () => {
  return (
    <div className={styles.container}>
      <EmptyState
        title="No Active Strategy Yet"
        description='Create smart Strategy rules to automate your trades — like "Buy RELIANCE if NIFTY falls below 25,000" or "Exit TCS if profit crosses ₹500." Aagman keeps watching, so you don&apos;t have to.'
        illustration={<PlaygroundIcon />}
      />
    </div>
  );
};
