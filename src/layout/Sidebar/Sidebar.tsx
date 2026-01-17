"use client";

import React, { useState } from "react";
import { Logo } from "@/components/Logo";
import { NavItem } from "@/components/NavItem";
import { Divider } from "@/components/Divider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserProfile } from "@/components/UserProfile";
import {
  ChatIcon,
  DashboardIcon,
  ScreenersIcon,
  AlertsIcon,
  NewsIcon,
  FundamentalsIcon,
  LogoIcon,
  CollapsibleIcon,
} from "@/assets/icons";
import styles from "./Sidebar.module.css";

interface NavItemType {
  id: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

const navItems: NavItemType[] = [
  { id: "chat", label: "Chat", icon: <ChatIcon />, isActive: true },
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { id: "screeners", label: "Screeners", icon: <ScreenersIcon /> },
  { id: "alerts", label: "Alerts", icon: <AlertsIcon /> },
  { id: "news", label: "News", icon: <NewsIcon /> },
  { id: "fundamentals", label: "Fundamentals", icon: <FundamentalsIcon /> },
];

export const Sidebar: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
    >
      <div className={styles.logoSection}>
        <LogoIcon className={styles.logo} width={24} height={24} />
        {!isCollapsed && (
          <img
            className={styles.fullLogo}
            src="/images/fullLogo.png"
            alt="Logo"
          />
        )}
        <button
          className={styles.collapseButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <CollapsibleIcon />
        </button>
      </div>

      <Divider />

      {/* Navigation */}
      <nav className={styles.navigation}>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            isActive={item.isActive}
            hideLabel={isCollapsed}
          />
        ))}
      </nav>

      <Divider />

      {/* Theme Toggle */}
      <div className={styles.footer}>
        <ThemeToggle
          theme={theme}
          onThemeChange={setTheme}
          isCollapsed={isCollapsed}
        />
      </div>

      {!isCollapsed && <Divider />}

      {/* User Profile */}
      <div className={styles.footer}>
        <UserProfile
          name="Sushmita Swain"
          initials="S"
          hideLabel={isCollapsed}
        />
      </div>
    </aside>
  );
};
