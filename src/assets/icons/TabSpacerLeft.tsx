import React from "react";

export const TabSpacerLeft: React.FC<React.SVGProps<SVGSVGElement>> = (
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
      d="M0 8L8 8L8 0C8 4.41716 4.41859 7.99818 0 8Z"
      fill="#26272E"
    />
  </svg>
);
