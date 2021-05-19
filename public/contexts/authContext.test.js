import React from "react";
import { shallow, mount } from "enzyme";

import authContext from "./authContext";

// a functional component that calls useSuccess for our tests
const FunctionalComponent = () => {
  authContext.useAuth();
  return <div />;
};

test("useAuth throws error when not wrapped in AuthProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useAuth must be used within a AuthProvider");
});

test("useAuth does not throw error when wrapped in AuthProvider", () => {
  expect(() => {
    mount(
      <authContext.AuthProvider>
        <FunctionalComponent />
      </authContext.AuthProvider>
    );
  }).not.toThrow();
});
