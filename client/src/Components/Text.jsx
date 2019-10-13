import React from "react";
import classNames from "classnames";

const Text = ({ category = "p1", className = "", children, ...rest }) => {
  const eq = (c1, c2) => c1 == c2;

  return (
    <span
      className={classNames(
        {
          // Heading
          "block text-3xl font-semibold": eq(category, "h1"),
          "block text-2xl font-semibold": eq(category, "h2"),
          "block text-lg font-semibold": eq(category, "h3"),
          "block text-base font-semibold": eq(category, "h4"),
          // Subheading
          "block text-3xl": eq(category, "s1"),
          "block text-2xl": eq(category, "s2"),
          "block text-lg": eq(category, "s3"),
          // Caption
          "block text-sm uppercase tracking-wide font-semibold": eq(
            category,
            "c1"
          ),
          "block text-sm uppercase tracking-wide": eq(category, "c2"),
          // Paragraph
          "block text-base": eq(category, "p1")
        },
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Text;
