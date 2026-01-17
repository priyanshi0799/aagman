import React from "react";

interface RiskShieldIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const RiskShieldIcon: React.FC<RiskShieldIconProps> = ({
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
        d="M8.47651 16.2111C8.64255 16.308 8.72557 16.3564 8.84274 16.3815C8.93367 16.401 9.06633 16.401 9.15726 16.3815C9.27443 16.3564 9.35745 16.308 9.52349 16.2111C10.9845 15.3587 15 12.6813 15 8.99993V6.14993C15 5.34451 15 4.9418 14.8758 4.65593C14.7497 4.36538 14.6239 4.21081 14.3652 4.02811C14.1106 3.84835 13.6115 3.74455 12.6133 3.53694C11.5131 3.30813 10.6682 2.89496 9.89578 2.29742C9.52538 2.01088 9.34018 1.86761 9.19525 1.82853C9.04233 1.7873 8.95767 1.7873 8.80475 1.82853C8.65982 1.86761 8.47462 2.01088 8.10422 2.29742C7.33179 2.89496 6.4869 3.30813 5.38672 3.53694C4.38853 3.74455 3.88943 3.84835 3.63483 4.02811C3.37607 4.21081 3.25034 4.36538 3.12415 4.65593C3 4.9418 3 5.34451 3 6.14993V8.99993C3 12.6813 7.01547 15.3587 8.47651 16.2111Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
