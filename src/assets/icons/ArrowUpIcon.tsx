interface ArrowUpIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const ArrowUpIcon: React.FC<ArrowUpIconProps> = ({
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
        d="M8.00065 12.6667V3.33337M8.00065 3.33337L3.33398 8.00004M8.00065 3.33337L12.6673 8.00004"
        stroke="#27AE60"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
