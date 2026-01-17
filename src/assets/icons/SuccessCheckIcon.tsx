import React from "react";

interface SuccessCheckIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const SuccessCheckIcon: React.FC<SuccessCheckIconProps> = ({
  width = 16,
  height = 16,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_88_174)">
        <path
          d="M5.00065 7.99998L7.00065 9.99998L11.0007 5.99998M14.6673 7.99998C14.6673 11.6819 11.6825 14.6666 8.00065 14.6666C4.31875 14.6666 1.33398 11.6819 1.33398 7.99998C1.33398 4.31808 4.31875 1.33331 8.00065 1.33331C11.6825 1.33331 14.6673 4.31808 14.6673 7.99998Z"
          stroke="#0CAC6A"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_88_174">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
