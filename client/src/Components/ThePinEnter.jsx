import React from "react";
import classNames from "classnames";

const NumberHolderSpacer = () => (
  <div className="flex items-center justify-center w-12 h-16">
    <svg width="24" height="24" version="1.1" viewBox="0 0 24 24">
      <path
        d="M23.5,12h-23"
        strokeLinecap="round"
        strokeWidth="1"
        stroke="#4A5568"
        fill="none"
        strokeLinejoin="round"
      ></path>
    </svg>
  </div>
);
const NumberHolder = ({ className = "", filled = false, active = false }) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-center border-b-2 w-12 h-16",
        {
          "border-indigo-200": !active,
          "border-indigo-600": active
        },
        className
      )}
    >
      {filled && (
        <svg width="16" height="16" version="1.1" viewBox="0 0 24 24">
          <path
            d="M19.0711,4.99693c3.90524,3.90524 3.90524,10.2369 0,14.1421c-3.90524,3.90524 -10.2369,3.90524 -14.1421,0c-3.90524,-3.90524 -3.90524,-10.2369 -1.77636e-15,-14.1421c3.90524,-3.90524 10.2369,-3.90524 14.1421,-1.77636e-15"
            strokeLinecap="round"
            strokeWidth="1"
            stroke="#4A5568"
            fill="#4A5568"
            strokeLinejoin="round"
          ></path>
        </svg>
      )}
    </div>
  );
};

const ThePinEnter = ({ value = "" }) => {
  const valueFilledCount = String(value).slice(0, 4).length;

  return (
    <div className="flex flex-row">
      <NumberHolder
        className="mx-2"
        active={valueFilledCount == 0}
        filled={valueFilledCount > 0}
      />
      <NumberHolder
        className="mx-2"
        active={valueFilledCount == 1}
        filled={valueFilledCount > 1}
      />
      <NumberHolder
        className="mx-2"
        active={valueFilledCount == 2}
        filled={valueFilledCount > 2}
      />
      <NumberHolder
        className="mx-2"
        active={valueFilledCount == 3}
        filled={valueFilledCount > 3}
      />
    </div>
  );
};

export default ThePinEnter;
