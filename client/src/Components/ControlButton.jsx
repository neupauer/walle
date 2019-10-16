import React from "react";
import classNames from "classnames";
import ArrowUp from "../Icon/ArrowUp";

const ControlButton = ({
  active,
  transform,
  className = "",
  onMouseUp = () => {},
  onMouseDown = () => {},
  ...rest
}) => {
  return (
    <button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchCancel={onMouseUp}
      onTouchEnd={onMouseUp}
      className={classNames(
        {
          "bg-indigo-500": active,
          "hover:bg-gray-600 bg-gray-700": !active
        },
        "flex items-center justify-center font-bold py-2 px-4 rounded inline-flex items-center h-24 w-24 m-1 select-none",
        className
      )}
    >
      <ArrowUp
        transform={transform}
        className={`stroke-current ${
          active ? "text-white" : "text-gray-500"
        } h-12 w-12`}
        {...rest}
      />
    </button>
  );
};

export default ControlButton;
