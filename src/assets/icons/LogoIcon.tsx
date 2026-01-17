import React from 'react';

interface LogoIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({ 
  width = 17, 
  height = 18, 
  className 
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 17 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_dii_16_3279)">
        <path 
          d="M0 3.55556C0 1.59188 1.59188 0 3.55556 0H12.4444C14.4081 0 16 1.59188 16 3.55556V12.4444C16 14.4081 14.4081 16 12.4444 16H3.55556C1.59188 16 0 14.4081 0 12.4444V3.55556Z" 
          fill="#19E299"
        />
        <path 
          d="M3.55566 0.444336H12.4443C14.1626 0.444336 15.5557 1.83744 15.5557 3.55566V12.4443C15.5557 14.1626 14.1626 15.5557 12.4443 15.5557H3.55566C1.83744 15.5557 0.444336 14.1626 0.444336 12.4443V3.55566C0.444336 1.83744 1.83744 0.444336 3.55566 0.444336Z" 
          stroke="url(#paint0_linear_16_3279)" 
          strokeWidth="0.888889"
        />
      </g>
      <path 
        d="M5.66649 13H4L7.03419 4.44385H8.9616L12 13H10.3335L8.03156 6.19853H7.96423L5.66649 13ZM5.7212 9.64522H10.2662V10.8902H5.7212V9.64522Z" 
        fill="black"
      />
      <path 
        d="M6.07975 3H9.95398V3.90498H6.07975V3Z" 
        fill="black"
      />
      <defs>
        <filter 
          id="filter0_dii_16_3279" 
          x="-0.888889" 
          y="-0.444444" 
          width="17.7778" 
          height="17.7778" 
          filterUnits="userSpaceOnUse" 
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix 
            in="SourceAlpha" 
            type="matrix" 
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" 
            result="hardAlpha"
          />
          <feOffset dy="0.444444"/>
          <feGaussianBlur stdDeviation="0.444444"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix 
            type="matrix" 
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_16_3279"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_16_3279" result="shape"/>
          <feColorMatrix 
            in="SourceAlpha" 
            type="matrix" 
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" 
            result="hardAlpha"
          />
          <feOffset dy="-0.888889"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix 
            type="matrix" 
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
          />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_16_3279"/>
          <feColorMatrix 
            in="SourceAlpha" 
            type="matrix" 
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" 
            result="hardAlpha"
          />
          <feMorphology radius="0.444444" operator="erode" in="SourceAlpha" result="effect3_innerShadow_16_3279"/>
          <feOffset/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix 
            type="matrix" 
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.18 0"
          />
          <feBlend mode="normal" in2="effect2_innerShadow_16_3279" result="effect3_innerShadow_16_3279"/>
        </filter>
        <linearGradient 
          id="paint0_linear_16_3279" 
          x1="8" 
          y1="0" 
          x2="8" 
          y2="16" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.12"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
};
