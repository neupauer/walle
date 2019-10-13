import React from "react";
import Text from "../Components/Text";
import Container from "../Components/Container";
import Button from "../Components/Button";

const UiPlayground = () => {
  return (
    <Container>
      <div className="bg-white rounded-lg shadow-xl my-8 px-6 py-8">
        <Text category="h1">UI Playground</Text>

        <div className="mt-12">
          <Text category="s1" className="text-gray-700">
            Button
          </Text>
          {["default", "primary", "secondary", "danger", "success"].map(appearance => (
            ["lg", "default", "sm", "xs"].map(size => (
              <div className="mt-4">
                <Text category="c2" className="text-gray-700">
                  Appearance {appearance} / Size {size}
                </Text>
                <Button appearance={appearance} size={size}>Lemon drops ice cream</Button>
              </div>
            ))
          ))}
        </div>

        <div className="mt-12">
          <Text category="s1" className="text-gray-700">
            Text
          </Text>
          {["h1", "h2", "h3", "h4", "s1", "s2", "s3", "c1", "c2", "p1"].map(
            category => (
              <div className="mt-4">
                <Text category="c2" className="text-gray-700">
                  Category {category}
                </Text>
                <Text category={category}>
                  Apple pie biscuit carrot cake marshmallow croissant.
                </Text>
              </div>
            )
          )}
        </div>
      </div>
    </Container>
  );
};

export default UiPlayground;
