import React from "react";

const ArrowUp = ({
  left = false,
  right = false,
  up = false,
  down = false,
  ...rest
}) => (
  <svg viewBox="0 0 24 24" {...rest}>
    <g
      strokeLinecap="round"
      strokeWidth={1}
      fill="none"
      strokeLinejoin="round"
    >
      {up && (
        <>
          <path d="M6.5,5.497l5,-5l5,5" />
          <path d="M11.5,0.5v23" />
        </>
      )}
      {left && (
        <>
          <path d="M5.5,17.497l-5,-5l5,-5"></path>
          <path d="M0.5,12.5h23"></path>
        </>
      )}
      {right && (
        <>
          <path d="M18.5,7.497l5,5l-5,5"></path>
          <path d="M23.5,12.5h-23"></path>
        </>
      )}
      {down && (
        <>
          <path d="M16.5,18.497l-5,5l-5,-5"></path>
          <path d="M11.5,23.5v-23"></path>
        </>
      )}
    </g>
  </svg>
);

export default ArrowUp;
