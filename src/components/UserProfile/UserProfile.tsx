import React from "react";
import styles from "./UserProfile.module.css";

interface UserProfileProps {
  name: string;
  avatar?: string;
  initials?: string;
  onClick?: () => void;
  hideLabel?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  avatar,
  initials,
  onClick,
  hideLabel = false,
}) => {
  const displayInitials = initials || name.charAt(0).toUpperCase();

  return (
    <div className={styles.userProfile} onClick={onClick} title={hideLabel ? name : undefined}>
      <div className={styles.avatar}>
        {avatar ? (
          <img src={avatar} alt={name} className={styles.avatarImage} />
        ) : (
          <span className={styles.initials}>{displayInitials}</span>
        )}
      </div>
      {!hideLabel && <span className={styles.userName}>{name}</span>}
    </div>
  );
};
