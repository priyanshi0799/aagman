import React from "react";
import { PlusIcon, TabSpacerLeft, TabSpacerRight } from "@/assets/icons";
import { Tab } from "./Tab";
import styles from "./TabBar.module.css";

interface TabBarProps {
  tabs?: Array<{ id: string; title: string }>;
  onAddTab?: () => void;
  onCloseTab?: (id: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs = [{ id: "1", title: "High-Volume Break..." }],
  onAddTab,
  onCloseTab,
}) => {
  return (
    <div className={styles.tabsWrapper}>
      <div className={styles.tabs}>
        <TabSpacerLeft className={styles.tabSpacer} />
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            title={tab.title}
            onClose={() => onCloseTab?.(tab.id)}
          />
        ))}
        <TabSpacerRight className={styles.tabSpacer} />
      </div>
      <button className={styles.searchTabBtn} onClick={onAddTab}>
        <PlusIcon width={28} height={28} />
      </button>
    </div>
  );
};
