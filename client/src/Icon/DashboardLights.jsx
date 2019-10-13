import React from "react";
import classNames from "classnames";

const SvgComponent = ({ className = "", ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    className={classNames("stroke-current", className)}
    {...rest}
  >
    <g strokeLinecap="round" strokeWidth={1} fill="none" strokeLinejoin="round">
      <path d="M20.1317,3.86827c4.49103,4.49103 4.49103,11.7724 0,16.2635c-4.49103,4.49103 -11.7724,4.49103 -16.2635,0c-4.49103,-4.49103 -4.49103,-11.7724 0,-16.2635c4.49103,-4.49103 11.7724,-4.49103 16.2635,0" />
      <path d="M19.214,12.548l-1.19259e-08,-8.83007e-07c-0.0328696,-2.43369 -2.0181,-4.3877 -4.452,-4.382l-5.50834e-08,-2.41569e-10c-1.2236,-0.00536603 -2.2278,0.96687 -2.262,2.19v4.382l-4.87347e-08,-1.77092e-06c0.0336701,1.22352 1.03802,2.19635 2.262,2.191l6.10113e-08,1.43139e-10c2.43352,0.00570924 4.41859,-1.94771 4.452,-4.381Z" />
      <path d="M10.53,12.5l-5.03,1" />
      <path d="M10.53,9.5l-5.03,1" />
      <path d="M10.53,15.5l-5.03,1" />
    </g>
  </svg>
);

export default SvgComponent;
