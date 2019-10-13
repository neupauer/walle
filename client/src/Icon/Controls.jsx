import React from "react";
import classNames from "classnames";

const SvgComponent = ({ className = "", ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    className={classNames("stroke-current", className)}
    {...rest}
  >
    <g strokeLinecap="round" strokeWidth={0.75} fill="none" strokeLinejoin="round">
      <path d="M1.5,23.497c-0.55228,0 -1,-0.44772 -1,-1v-8c0,-0.55228 0.44772,-1 1,-1h8c0.55228,0 1,0.44772 1,1v8c0,0.55228 -0.44772,1 -1,1Z" />
      <path d="M14.5,23.497c-0.55228,0 -1,-0.44772 -1,-1v-8c0,-0.55228 0.44772,-1 1,-1h8c0.55228,0 1,0.44772 1,1v8c0,0.55228 -0.44772,1 -1,1Z" />
      <path d="M8.5,11.497c-0.55228,0 -1,-0.44772 -1,-1v-8c0,-0.55228 0.44772,-1 1,-1h8c0.55228,0 1,0.44772 1,1v8c0,0.55228 -0.44772,1 -1,1Z" />
      <path d="M12.5,9.48v-5.98" />
      <path d="M10,5.997l2.5,-2.5l2.5,2.5" />
      <path d="M8.5,18.5h-6" />
      <path d="M5,20.997l-2.5,-2.5l2.5,-2.5" />
      <path d="M15.5,18.5h6" />
      <path d="M19,20.997l2.5,-2.5l-2.5,-2.5" />
    </g>
  </svg>
);

export default SvgComponent;
