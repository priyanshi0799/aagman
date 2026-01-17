import React from "react";

interface NewsIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const NewsIcon: React.FC<NewsIconProps> = ({
  width = 24,
  height = 24,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.6992 17.3999H10.1992"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.3992 13.8H10.1992"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.8 21H19.2C19.6774 21 20.1352 20.8104 20.4728 20.4728C20.8104 20.1352 21 19.6774 21 19.2V4.8C21 4.32261 20.8104 3.86477 20.4728 3.52721C20.1352 3.18964 19.6774 3 19.2 3H8.4C7.92261 3 7.46477 3.18964 7.12721 3.52721C6.78964 3.86477 6.6 4.32261 6.6 4.8V19.2C6.6 19.6774 6.41036 20.1352 6.07279 20.4728C5.73523 20.8104 5.27739 21 4.8 21ZM4.8 21C4.32261 21 3.86477 20.8104 3.52721 20.4728C3.18964 20.1352 3 19.6774 3 19.2V11.1C3 10.6226 3.18964 10.1648 3.52721 9.82721C3.86477 9.48964 4.32261 9.3 4.8 9.3H6.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4992 6.6001H11.0992C10.6022 6.6001 10.1992 7.00304 10.1992 7.5001V9.3001C10.1992 9.79715 10.6022 10.2001 11.0992 10.2001H16.4992C16.9963 10.2001 17.3992 9.79715 17.3992 9.3001V7.5001C17.3992 7.00304 16.9963 6.6001 16.4992 6.6001Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
