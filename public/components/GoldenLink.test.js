import React from "react";
import GoldenLink from "./GoldenLink";
import { findByTestAttr, checkProps } from "../../test/testutils";
import { shallow } from "enzyme";

const setup = () => {
  return shallow(<GoldenLink href="/hello">Hello World</GoldenLink>);
};

test("should render without error", () => {
  let wrapper = setup();
  const goldenLink = findByTestAttr(wrapper, "golden-link");
  expect(goldenLink.exists()).toBe(true);
});

test("shouldn't throw an error when receive proper props", () => {
  checkProps(GoldenLink, {
    href: "/hello",
    children: "Hello World",
  });
});
