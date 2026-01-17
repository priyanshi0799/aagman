import React from "react";
import { LogoIcon, DotAnimationIcon } from "@/assets/icons";
import { Chip, Loading } from "@/widgets";
import styles from "./ChatMessage.module.css";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
  isHandoff?: boolean;
  chips?: string[];
  onChipClick?: (chip: string) => void;
  agentName?: string;
  hideHeader?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  isLoading = false,
  isHandoff = false,
  chips = [],
  onChipClick,
  agentName,
  hideHeader = false,
}) => {
  if (isLoading) {
    return (
      <>
        <div className={styles.flexWrapper}>
          <LogoIcon />
          <p className={styles.logoText}>Āagman</p>
        </div>
        <Loading />
      </>
    );
  }

  if (isHandoff) {
    return (
      <>
        <div className={styles.flexWrapper}>
          <LogoIcon />
          <p className={styles.logoText}>Āagman</p>
        </div>
        <div className={styles.handoffMessage}>
          <DotAnimationIcon className={styles.handoffDot} />
          <span>{content}</span>
        </div>
      </>
    );
  }

  if (role === "user") {
    return <div className={styles.userMessage}>{content}</div>;
  }

  return (
    <>
      {!hideHeader && (
        <div className={styles.flexWrapper}>
          <LogoIcon />
          <p className={styles.logoText}>Āagman</p>
          {agentName && <p className={styles.agentName}>{agentName}</p>}
        </div>
      )}
      <div className={styles.messageBlock}>
        <p className={styles.messageText}>{content}</p>
        {chips.length > 0 && (
          <div className={styles.chipsContainer}>
            {chips.map((chip) => (
              <Chip
                key={chip}
                label={chip}
                onClick={() => onChipClick?.(chip)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
