import React from "react";
import Image from "next/image";
import { LogoIcon } from "@/assets/icons";
import styles from "./Logo.module.css";

interface LogoProps {
  variant?: "full" | "icon";
}

export const Logo: React.FC<LogoProps> = ({ variant = "full" }) => {
  if (variant === "icon") {
    return (
      <div className={styles.logoWrap}>
        <LogoIcon width={24} height={24} />
      </div>
    );
  }

  return (
    <div className={styles.logoWrap}>
      <Image
        src="/images/fullLogo.png"
        alt="Āagman"
        width={230}
        height={64}
        className={styles.fullLogo}
        priority
      />
    </div>
  );
};
