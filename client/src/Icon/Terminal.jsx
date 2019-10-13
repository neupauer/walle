import React from "react";
import classNames from "classnames";

const SvgComponent = ({ className = "", ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    className={classNames("stroke-current", className)}
    {...rest}
  >
    <g strokeLinecap="round" strokeWidth={1} fill="none" strokeLinejoin="round">
      <path d="M6.5,10.5l2.5,2.5l-2.5,2.5" />
      <path d="M12.5,13.5h4" />
      <path d="M14,4.75h-1.09278e-08c0.138071,-6.03528e-09 0.25,0.111929 0.25,0.25c6.03528e-09,0.138071 -0.111929,0.25 -0.25,0.25c-0.138071,6.03528e-09 -0.25,-0.111929 -0.25,-0.25l3.55271e-15,2.68211e-08c-2.08482e-08,-0.138071 0.111929,-0.25 0.25,-0.25c3.38653e-09,0 7.54132e-09,-8.88178e-16 1.09278e-08,-8.88178e-16" />
      <path d="M17,4.75h-1.09278e-08c0.138071,-6.03528e-09 0.25,0.111929 0.25,0.25c6.03528e-09,0.138071 -0.111929,0.25 -0.25,0.25c-0.138071,6.03528e-09 -0.25,-0.111929 -0.25,-0.25l3.55271e-15,2.68211e-08c-2.08482e-08,-0.138071 0.111929,-0.25 0.25,-0.25c3.38652e-09,0 7.54132e-09,-8.88178e-16 1.09278e-08,-8.88178e-16" />
      <path d="M20,4.75h-1.09278e-08c0.138071,-6.03528e-09 0.25,0.111929 0.25,0.25c6.03528e-09,0.138071 -0.111929,0.25 -0.25,0.25c-0.138071,6.03528e-09 -0.25,-0.111929 -0.25,-0.25l3.55271e-15,2.68211e-08c-2.08482e-08,-0.138071 0.111929,-0.25 0.25,-0.25c3.38652e-09,0 7.54132e-09,-8.88178e-16 1.09278e-08,-8.88178e-16" />
      <path d="M1.5,21.5c-0.55228,0 -1,-0.44772 -1,-1v-17c0,-0.55228 0.44772,-1 1,-1h21c0.55228,0 1,0.44772 1,1v17c0,0.55228 -0.44772,1 -1,1Z" />
      <path d="M0.5,7.5h23" />
    </g>
  </svg>
);

export default SvgComponent;
