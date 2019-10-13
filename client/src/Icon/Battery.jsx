import React from "react";
import classNames from "classnames";

const SvgComponent = ({ className = "", ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    className={classNames("stroke-current", className)}
    {...rest}
  >
    <g strokeLinecap="round" strokeWidth={1} fill="none" strokeLinejoin="round">
      <path d="M19.5,18h-18h-4.37114e-08c-0.552285,-2.41411e-08 -1,-0.447715 -1,-1c0,0 0,-3.55271e-15 0,-3.55271e-15v-9l1.06581e-14,1.50996e-07c-8.33927e-08,-0.552285 0.447715,-1 1,-1h18h-4.37114e-08c0.552285,-2.41411e-08 1,0.447715 1,1v2h2l-4.37114e-08,1.77636e-15c0.552285,-2.41411e-08 1,0.447715 1,1v3v0c0,0.552285 -0.447715,1 -1,1h-2v2l3.55271e-15,8.74228e-08c0,0.552285 -0.447715,1 -1,1Z" />
      <path d="M3.5,9v7" />
      <path d="M6.5,9v7" />
      <path d="M9.5,9v7" />
      <path d="M12.5,9v7" />
    </g>
  </svg>
);

export default SvgComponent;
