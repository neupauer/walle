import React from "react";
import classNames from "classnames";

const SvgComponent = ({ className = "", ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    className={classNames("stroke-current", className)}
    {...rest}
  >
    <g strokeLinecap="round" strokeWidth={1} fill="none" strokeLinejoin="round">
      <path d="M23.5,0.5l-23,23" />
      <path d="M23.5,23.5l-23,-23" />
    </g>
  </svg>
);

export default SvgComponent;
