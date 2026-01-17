import React from "react";
import {
  PlusIcon,
  SearchTabIcon,
  TabSpacerLeft,
  TabSpacerRight,
} from "@/assets/icons";
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
      <div className={styles.flexWrapper}>
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
          <PlusIcon width={20} height={20} />
        </button>
      </div>
      <div className={styles.searchTabIcon}>
        <SearchTabIcon width={20} height={20} />
      </div>
    </div>
  );
};
