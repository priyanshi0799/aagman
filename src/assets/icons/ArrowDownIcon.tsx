interface ArrowDownIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const ArrowDownIcon: React.FC<ArrowDownIconProps> = ({
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
      <path
        d="M8.00065 3.33337V12.6667M8.00065 12.6667L12.6673 8.00004M8.00065 12.6667L3.33398 8.00004"
        stroke="#FE506B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
