"use client";

import React from "react";
import { Logo } from "@/components/Logo";
import { NavItem } from "@/components/NavItem";
import { Divider } from "@/components/Divider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserProfile } from "@/components/UserProfile";
import styles from "./Sidebar.module.css";

interface NavItemType {
  id: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

const navItems: NavItemType[] = [
  { id: "chat", label: "Chat", isActive: true },
  { id: "dashboard", label: "Dashboard" },
  { id: "screeners", label: "Screeners" },
  { id: "alerts", label: "Alerts" },
  { id: "news", label: "News" },
  { id: "fundamentals", label: "Fundamentals" },
];

export const Sidebar: React.FC = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  return (
    <aside className={styles.sidebar}>
      {/* Logo Section */}
      <div className={styles.profile}>
        <Logo size="md" />
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
          />
        ))}
      </nav>

      <Divider />

      {/* Theme Toggle */}
      <div className={styles.footer}>
        <ThemeToggle theme={theme} onThemeChange={setTheme} />
      </div>

      <Divider />

      {/* User Profile */}
      <div className={styles.footer}>
        <UserProfile name="Sushmita Swain" initials="S" />
      </div>
    </aside>
  );
};
