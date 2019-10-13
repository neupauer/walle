import React from "react";
import classNames from "classnames";

const Container = ({ className = "", children, ...rest }) => {
  return (
    <div className={classNames("container mx-auto px-4", className)} {...rest}>
      {children}
    </div>
  );
};

export default Container;
