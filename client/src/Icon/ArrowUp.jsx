import React from "react";

const ArrowUp = ({ transform, ...rest }) => (
  <svg viewBox="0 0 24 24" {...rest}>
    <g
      strokeLinecap="round"
      strokeWidth={1}
      fill="none"
      strokeLinejoin="round"
      transform={transform}
    >
      <path d="M6.5,5.497l5,-5l5,5" />
      <path d="M11.5,0.5v23" />
    </g>
  </svg>
);

export default ArrowUp;
