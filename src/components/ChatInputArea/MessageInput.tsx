import React from "react";
import {
  MicrophoneIcon,
  GlobeIcon,
  VolumeIcon,
  PlusIcon,
  SendIcon,
} from "@/assets/icons";
import styles from "./ChatInputArea.module.css";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend?: () => void;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "E.g. Buy 100 TCS at ₹3500, SL ₹3480...",
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend?.();
    }
  };

  return (
    <div className={styles.inputGroup}>
      <div className={styles.mainInputField}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={styles.messageInput}
        />
        <div className={styles.inputActions}>
          <div className={styles.leftActions}>
            <button className={styles.plusButton}>
              <PlusIcon width={20} height={20} />
            </button>
            <button className={styles.languageButton}>
              <GlobeIcon />
              <span className={styles.actionText}>English</span>
            </button>
          </div>
          <div className={styles.rightActions}>
            <button className={styles.plusButton}>
              <VolumeIcon />
            </button>
            <button className={styles.plusButton}>
              <MicrophoneIcon />
            </button>

            <button className={styles.sendButton} onClick={onSend}>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
