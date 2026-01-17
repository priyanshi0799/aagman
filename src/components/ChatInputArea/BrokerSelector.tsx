"use client";

import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/widgets/Badge/Badge";
import { ChevronDownIcon, ChevronUpIcon } from "@/assets/icons";
import Image from "next/image";
import { Broker, allBrokers } from "@/utils/data";
import styles from "./ChatInputArea.module.css";

interface BrokerSelectorProps {
  broker?: string;
  onBrokerChange?: (broker: string) => void;
}

export const BrokerSelector: React.FC<BrokerSelectorProps> = ({
  broker = "Zerodha",
  onBrokerChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState(broker);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([
    "Zerodha",
    "Groww",
  ]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBrokerSelect = (brokerName: string) => {
    setSelectedBroker(brokerName);
    setIsOpen(false);

    // Update recently used list
    setRecentlyUsed((prev) => {
      const filtered = prev.filter((b) => b !== brokerName);
      return [brokerName, ...filtered].slice(0, 2); // Keep only 2 recent
    });

    onBrokerChange?.(brokerName);
  };

  const getSelectedBrokerImage = () => {
    return (
      allBrokers.find((b) => b.name === selectedBroker)?.image ||
      allBrokers[0].image
    );
  };

  const recentlyUsedBrokers = recentlyUsed
    .map((name) => allBrokers.find((b) => b.name === name))
    .filter((b): b is Broker => b !== undefined);

  const availableBrokers = allBrokers.filter(
    (b) => !recentlyUsed.includes(b.name)
  );

  const renderBrokerItem = (
    broker: Broker,
    index: number,
    showPrimaryBadge: boolean = false,
    imageSize: number = 20
  ) => (
    <button
      key={broker.id}
      className={`${styles.brokerItem} ${
        showPrimaryBadge && index === 0 ? styles.primaryBroker : ""
      }`}
      onClick={() => handleBrokerSelect(broker.name)}
    >
      <Image
        src={broker.image}
        alt={broker.name}
        width={imageSize}
        height={imageSize}
        className={styles.brokerLogo}
      />
      <span className={styles.brokerName}>{broker.name}</span>
      {showPrimaryBadge && index === 0 && (
        <span className={styles.primaryBadge}>Primary</span>
      )}
    </button>
  );

  return (
    <div className={styles.brokerSelectorWrapper} ref={dropdownRef}>
      <div className={styles.inputField}>
        <span className={styles.inputText}>
          Execute orders & monitor positions on
        </span>
        <Badge
          icon={
            <Image
              src={getSelectedBrokerImage()}
              alt={selectedBroker}
              width={18}
              height={18}
              className={styles.brokerIcon}
            />
          }
        >
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={styles.badgeButton}
          >
            <div>{selectedBroker}</div>
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
        </Badge>
      </div>

      {isOpen && (
        <div className={styles.brokerDropdown}>
          <div className={styles.dropdownSection}>
            <h3 className={styles.sectionTitle}>RECENTLY USED</h3>
            {recentlyUsedBrokers.map((broker, index) =>
              renderBrokerItem(broker, index, true, 40)
            )}
          </div>

          <div className={styles.dropdownSection}>
            <h3 className={styles.sectionTitle}>AVAILABLE BROKERS</h3>
            {availableBrokers.map((broker, index) =>
              renderBrokerItem(broker, index, false, 20)
            )}
          </div>
        </div>
      )}
    </div>
  );
};
