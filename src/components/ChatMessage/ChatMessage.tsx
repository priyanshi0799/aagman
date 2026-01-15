import React from "react";
import styles from "./ChatMessage.module.css";

interface ChatMessageProps {
  sender: "ai" | "user";
  senderName?: string;
  children: React.ReactNode;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  senderName = "Āagman",
  children,
}) => {
  return (
    <div className={styles.messageGroup}>
      <div className={styles.profileSection}>
        {sender === "ai" && (
          <>
            <div className={styles.aiAvatar}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect width="16" height="16" rx="3.56" fill="#19E299" />
                <path
                  d="M4 3L8 13L12 3"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className={styles.profileName}>{senderName}</span>
          </>
        )}
      </div>
      <div className={styles.messageContent}>{children}</div>
    </div>
  );
};
