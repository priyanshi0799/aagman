import React from "react";
import styles from "./NavItem.module.css";

interface NavItemProps {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  hideLabel?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  isActive = false,
  onClick,
  hideLabel = false,
}) => {
  return (
    <button
      className={`${styles.navLink} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      title={hideLabel ? label : undefined}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {!hideLabel && <span className={styles.navLabel}>{label}</span>}
    </button>
  );
};
