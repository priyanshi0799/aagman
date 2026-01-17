import React from "react";

interface BarChartIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const BarChartIcon: React.FC<BarChartIconProps> = ({
  width = 18,
  height = 18,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.5 15V7.5M9 15V3M4.5 15V10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
