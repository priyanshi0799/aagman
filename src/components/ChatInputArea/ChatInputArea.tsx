import React from "react";
import { BrokerSelector } from "./BrokerSelector";
import { MessageInput } from "./MessageInput";
import styles from "./ChatInputArea.module.css";

interface ChatInputAreaProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSend?: () => void;
  broker?: string;
  onBrokerChange?: (broker: string) => void;
}

export const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  message,
  onMessageChange,
  onSend,
  broker,
  onBrokerChange,
}) => {
  return (
    <div className={styles.inputArea}>
      <BrokerSelector broker={broker} onBrokerChange={onBrokerChange} />
      <MessageInput
        value={message}
        onChange={onMessageChange}
        onSend={onSend}
      />
    </div>
  );
};
