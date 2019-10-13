import React from "react";
import classNames from "classnames";

const Button = ({
  appearance = "default",
  size = "default",
  className = "",
  children,
  ...rest
}) => {
  const eq = (a1, a2) => a1 == a2;

  return (
    <button
      className={classNames(
        {
          "bg-gray-300 hover:bg-gray-400 text-gray-800": eq(
            appearance,
            "default"
          ),
          "bg-indigo-400 hover:bg-indigo-500 text-white": eq(
            appearance,
            "secondary"
          ),
          "bg-indigo-600 hover:bg-indigo-500 text-white": eq(
            appearance,
            "primary"
          ),
          "bg-green-600 hover:bg-green-400 text-white": eq(
            appearance,
            "success"
          ),
          "bg-red-600 hover:bg-red-500 text-white": eq(appearance, "danger"),
          "text-xs": eq(size, "xs"),
          "text-sm": eq(size, "sm"),
          "text-base": eq(size, "default"),
          "text-lg": eq(size, "lg")
        },
        "font-semibold py-2 px-4 rounded",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
