import React from "react";
import classNames from "classnames";

const SvgComponent = ({ className = "", ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    className={classNames("stroke-current", className)}
    {...rest}
  >
    <g strokeLinecap="round" strokeWidth={1} fill="none" strokeLinejoin="round">
      <path d="M4.593,9.593h14.814l-1.74846e-07,3.55271e-15c2.20914,-9.65645e-08 4,1.79086 4,4v1.936v0c0,1.10457 -0.895431,2 -2,2h-18.807l-8.74228e-08,-3.55271e-15c-1.10457,-4.82823e-08 -2,-0.895431 -2,-2c0,0 0,0 0,0v-1.94l-8.68767e-08,8.79788e-05c0.00215298,-2.20485 1.78807,-3.99218 3.99291,-3.99609Z" />
      <path d="M5.11947,13.0035c0.58071,0.58071 0.58071,1.52223 0,2.10294c-0.58071,0.58071 -1.52223,0.58071 -2.10294,0c-0.58071,-0.58071 -0.58071,-1.52223 -8.88178e-16,-2.10294c0.58071,-0.58071 1.52223,-0.58071 2.10294,0" />
      <path d="M20.9835,13.0035c0.58071,0.58071 0.58071,1.52223 0,2.10294c-0.58071,0.58071 -1.52223,0.58071 -2.10294,0c-0.58071,-0.58071 -0.58071,-1.52223 0,-2.10294c0.58071,-0.58071 1.52223,-0.58071 2.10294,0" />
      <path d="M4.068,9.593l0.715,-4.293l4.42801e-08,-2.64155e-07c0.160179,-0.955558 0.98711,-1.65566 1.956,-1.656h10.522l-5.21454e-09,-1.83853e-12c0.96889,0.000341493 1.79582,0.700442 1.956,1.656l0.715,4.292" />
      <path d="M5.555,17.525v1.488v0c0,0.821247 -0.665753,1.487 -1.487,1.487c-0.821247,0 -1.487,-0.665753 -1.487,-1.487v-1.488" />
      <path d="M21.419,17.525v1.488h3.55271e-15c0,0.821247 -0.665753,1.487 -1.487,1.487c-0.821247,0 -1.487,-0.665753 -1.487,-1.487v-1.488" />
      <path d="M19.552,7.313l1.717,-0.991l2.01537e-08,-1.16247e-08c0.711895,-0.410624 1.62188,-0.166395 2.0325,0.5455c0.410624,0.711895 0.166395,1.62188 -0.5455,2.0325l-1.756,1.012" />
      <path d="M4.448,7.313l-1.717,-0.991l2.08191e-08,1.20085e-08c-0.711895,-0.410624 -1.62188,-0.166395 -2.0325,0.5455c-0.410624,0.711895 -0.166395,1.62188 0.5455,2.0325l1.756,1.012" />
    </g>
  </svg>
);

export default SvgComponent;