import React from "react";
import classNames from "classnames";

const SvgComponent = ({ className = "", ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    className={classNames("stroke-current", className)}
    {...rest}
  >
    <g strokeLinecap="round" strokeWidth={1} fill="none" strokeLinejoin="round">
      <path d="M18.364,3.13604c3.51472,3.51472 3.51472,9.2132 0,12.7279c-3.51472,3.51472 -9.2132,3.51472 -12.7279,0c-3.51472,-3.51472 -3.51472,-9.2132 -1.77636e-15,-12.7279c3.51472,-3.51472 9.2132,-3.51472 12.7279,-1.77636e-15" />
      <path d="M7.391,17.231l5.46475e-07,-4.77254e-07c-1.52096,1.3283 -2.39285,3.24967 -2.391,5.269l1.06581e-14,1.50996e-07c8.33927e-08,0.552285 0.447715,1 1,1h12h-4.37114e-08c0.552285,2.41411e-08 1,-0.447715 1,-1l1.41128e-08,-1.54307e-05c0.00184464,-2.01933 -0.870053,-3.9407 -2.39101,-5.26899" />
      <path d="M7.966,1.454l-3.7344e-07,-5.10745e-07c0.940931,1.28689 2.43981,2.04711 4.034,2.046l-8.29172e-08,-5.74731e-11c1.59419,0.00110497 3.09307,-0.75911 4.034,-2.046" />
      <path d="M13.0607,8.43934c0.585786,0.585786 0.585786,1.53553 0,2.12132c-0.585786,0.585786 -1.53553,0.585786 -2.12132,0c-0.585786,-0.585786 -0.585786,-1.53553 0,-2.12132c0.585786,-0.585786 1.53553,-0.585786 2.12132,0" />
      <path d="M14.8284,6.67157c1.5621,1.5621 1.5621,4.09476 0,5.65685c-1.5621,1.5621 -4.09476,1.5621 -5.65685,0c-1.5621,-1.5621 -1.5621,-4.09476 -1.77636e-15,-5.65685c1.5621,-1.5621 4.09476,-1.5621 5.65685,-8.88178e-16" />
    </g>
  </svg>
);

export default SvgComponent;