import React from 'react';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className }) => (
  <svg
    width="200"
    height="100"
    viewBox="0 0 200 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`cursor-pointer hover:scale-105 transition-transform duration-300 ${className || ''}`}
  >
    {/* الجبل المصغر */}
    <g transform="translate(70, 15)">
      <path
        d="M0 40 L30 0 L60 40 Z"
        fill="url(#mountainGradient)"
        strokeWidth="1.5"
      >
        <animate
          attributeName="opacity"
          values="1;0.8;1"
          dur="4s"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -3; 0 0"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
    </g>

    {/* النص أسفل الجبل */}
    <text
      x="100"
      y="75"
      fontFamily="'Noto Sans Arabic', sans-serif"
      fontSize="20"
      fontWeight="600"
      textAnchor="middle"
      fill="url(#textGradient)"
    >
      منصة الجبل للتوظيف
      <animate
        attributeName="opacity"
        values="1;0.9;1"
        dur="2.5s"
        repeatCount="indefinite"
      />
    </text>

    {/* التدرجات اللونية */}
    <defs>
      <linearGradient
        id="mountainGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>

      <linearGradient
        id="textGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#1F2937" />
        <stop offset="100%" stopColor="#4F46E5" />
      </linearGradient>
    </defs>
  </svg>
);

export default AnimatedLogo;