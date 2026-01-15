import React from "react";
import { Badge } from "@/widgets/Badge/Badge";
import { ChevronDownIcon } from "@/assets/icons";
import styles from "./ChatInputArea.module.css";

interface BrokerSelectorProps {
  broker?: string;
  onBrokerChange?: () => void;
}

export const BrokerSelector: React.FC<BrokerSelectorProps> = ({
  broker = "Angel One",
  onBrokerChange,
}) => {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.inputField}>
        <span className={styles.inputText}>
          Execute orders & monitor positions on
        </span>
        <Badge icon={<div className={styles.brokerIcon} />}>
          {broker}
          <ChevronDownIcon />
        </Badge>
      </div>
    </div>
  );
};
