import React from "react";
import {
  MicrophoneIcon,
  GlobeIcon,
  SendIcon,
  VolumeIcon,
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
  return (
    <div className={styles.inputGroup}>
      <div className={styles.mainInputField}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.messageInput}
        />
        <div className={styles.inputActions}>
          <div className={styles.leftActions}>
            <button className={styles.iconButton}>
              <MicrophoneIcon />
            </button>
            <button className={styles.iconButton}>
              <GlobeIcon />
              <span className={styles.actionText}>English</span>
            </button>
          </div>
          <div className={styles.rightActions}>
            <button className={styles.iconButton}>
              <VolumeIcon />
            </button>
            <button className={styles.iconButton}>
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
