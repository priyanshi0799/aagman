import React from "react";

interface SendIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const SendIcon: React.FC<SendIconProps> = ({
  width = 20,
  height = 20,
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.0004 15.8333V9.99996M10.2433 15.9038L16.0587 17.8507C16.5145 18.0032 16.7423 18.0795 16.8828 18.0248C17.0049 17.9772 17.0975 17.8751 17.1328 17.749C17.1735 17.6038 17.0752 17.3845 16.8787 16.9459L10.6383 3.0186C10.4462 2.58969 10.3501 2.37523 10.2162 2.30878C10.0999 2.25104 9.96334 2.25082 9.84686 2.30818C9.71279 2.37421 9.61601 2.58835 9.42245 3.01665L3.12703 16.9467C2.92895 17.385 2.82991 17.6041 2.87019 17.7495C2.90516 17.8757 2.99747 17.9782 3.11941 18.0261C3.25981 18.0812 3.48806 18.0055 3.94455 17.854L9.82165 15.9033C9.89991 15.8773 9.93903 15.8643 9.97905 15.8592C10.0146 15.8547 10.0505 15.8547 10.086 15.8593C10.126 15.8646 10.1651 15.8777 10.2433 15.9038Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
