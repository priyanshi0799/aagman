import React from "react";

export const TabSpacerRight: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 8L0 8L0 0C0 4.41716 3.58141 7.99818 8 8Z"
      fill="#26272E"
    />
  </svg>
);
