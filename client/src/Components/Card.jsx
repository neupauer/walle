import React from "react";
import classNames from "classnames";

const Card = ({ className = "", children, ...rest }) => {
  return (
    <div
      className={classNames(
        "bg-white rounded-lg shadow-xl p-4",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
