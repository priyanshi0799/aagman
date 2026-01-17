import React from "react";
import styles from "./MessageList.module.css";

interface MessageListProps {
  children: React.ReactNode;
}

export const MessageList: React.FC<MessageListProps> = ({ children }) => {
  return (
    <div className={styles.body}>
      <div className={styles.messages}>{children}</div>
    </div>
  );
};
