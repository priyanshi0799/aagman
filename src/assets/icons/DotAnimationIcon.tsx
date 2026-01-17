import React from "react";

interface DotAnimationIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const DotAnimationIcon: React.FC<DotAnimationIconProps> = ({
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
      <circle cx="8" cy="8" r="8" fill="#056F8D" />
      <circle cx="8" cy="8" r="8" fill="#05556A" />
      <circle cx="8" cy="8" r="4" fill="#5FD3F3" />
    </svg>
  );
};
