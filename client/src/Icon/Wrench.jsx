import React from "react";
import classNames from "classnames";

const SvgComponent = ({ className = "", ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    className={classNames("stroke-current", className)}
    {...rest}
  >
    <g strokeLinecap="round" strokeWidth={1} fill="none" strokeLinejoin="round">
      <path d="M3.06,23.06l4.82591e-08,-4.56685e-08c-0.601715,0.569413 -1.5511,0.543227 -2.12051,-0.0584872c-0.547145,-0.578183 -0.547358,-1.48307 -0.000486182,-2.06151l6.571,-6.573l2.121,2.122Z" />
      <path d="M6.45,13.31l4.24,4.24" />
      <path d="M19.91,4.1l-11.34,11.33" />
      <path d="M21.785,4.359l-3.47542e-09,4.65316e-09c-0.330491,0.442487 -0.957113,0.533277 -1.3996,0.202787c-0.0383306,-0.0286289 -0.0745573,-0.0599716 -0.108401,-0.0937866l-0.812,-0.811l-7.04803e-08,-7.02791e-08c-0.391082,-0.389966 -0.391987,-1.02313 -0.00202068,-1.41421c0.0421555,-0.0422761 0.0880123,-0.0806922 0.137021,-0.114788l2.216,-1.539l1.66062e-08,-1.15455e-08c0.198722,-0.138162 0.46787,-0.114154 0.639,0.057l0.9,0.9l-1.11435e-08,-1.11835e-08c0.175752,0.176384 0.194938,0.455206 0.045,0.654Z" />
      <path d="M11.586,9.586l-3.44,-3.44l-1.11546e-07,2.47058e-07c0.909061,-2.01343 0.0137921,-4.38258 -1.99964,-5.29164c-0.517422,-0.233615 -1.07865,-0.354412 -1.64636,-0.354361l-7.37363e-09,-2.77733e-12c-0.276148,-0.000104046 -0.551581,0.0280425 -0.822,0.084l-4.59951e-08,9.63259e-09c-0.270279,0.0566036 -0.443497,0.321594 -0.386893,0.591873c0.0199246,0.0951386 0.0671483,0.182407 0.135893,0.251127l1.427,1.427l1.5698e-08,1.57378e-08c0.0934689,0.0937055 0.145972,0.220648 0.146,0.353v1.293v0c0,0.276142 -0.223858,0.5 -0.5,0.5h-1.293l-9.70443e-09,-2.06235e-12c-0.132352,-2.81215e-05 -0.259294,-0.0525311 -0.353,-0.146l-1.427,-1.427l-7.56198e-10,-7.5647e-10c-0.195227,-0.195297 -0.51181,-0.195354 -0.707107,-0.000127015c-0.068745,0.0687203 -0.115969,0.155988 -0.135893,0.251127l-5.77923e-08,2.79285e-07c-0.0559575,0.270419 -0.084104,0.545852 -0.0839999,0.822l-1.62615e-08,0.000360079c-3.33571e-07,2.20914 1.79086,4 4,4c0.567716,8.57227e-08 1.12893,-0.120848 1.64633,-0.354509l3.44,3.44" />
      <path d="M14.414,12.414l3.44,3.44l2.81799e-08,-1.27232e-08c2.01343,-0.909061 4.38258,-0.0137918 5.29164,1.99964c0.233615,0.517422 0.354412,1.07865 0.354361,1.64636l4.60632e-08,0.000127591c9.53446e-05,0.276148 -0.0280599,0.55158 -0.0840259,0.821997l2.53917e-08,-1.21244e-07c-0.0566035,0.270279 -0.321594,0.443497 -0.591873,0.386893c-0.0951386,-0.0199245 -0.182407,-0.0671482 -0.251127,-0.135893l-1.427,-1.427l1.11001e-08,1.108e-08c-0.0936788,-0.0935085 -0.220613,-0.146057 -0.352974,-0.146125h-1.293h-2.18557e-08c-0.276142,1.20706e-08 -0.5,0.223858 -0.5,0.5c0,0 0,0 0,0v1.293l-1.12843e-08,-0.000106152c1.99847e-08,0.132352 0.052476,0.259306 0.145925,0.353031l1.427,1.427l6.37659e-09,6.3743e-09c0.195297,0.195227 0.195354,0.51181 0.000127004,0.707107c-0.0687203,0.068745 -0.155988,0.115969 -0.251127,0.135893l3.46331e-07,-7.1666e-08c-0.270419,0.0559575 -0.545852,0.0841041 -0.822,0.0840001l-1.77839e-07,1.60441e-11c-2.20914,0.000199259 -4.00016,-1.7905 -4.00036,-3.99964c-5.12067e-05,-0.567716 0.120746,-1.12894 0.354361,-1.64636l-3.44,-3.44" />
    </g>
  </svg>
);

export default SvgComponent;