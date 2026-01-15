import React from "react";
import styles from "./NavItem.module.css";

interface NavItemProps {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      className={`${styles.navLink} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.navLabel}>{label}</span>
    </button>
  );
};
