import React from "react";
import EmailPasswordSignup from "./EmailPasswordSignup";
import { render, screen } from "@testing-library/react";

import { findByTestAttr } from "../../test/testutils";

const setup = () => {
  return render(<EmailPasswordSignup />);
};

test("should render form ", () => {
  const { getByTitle } = setup();
  const formComponent = getByTitle("signup-form");
  expect(formComponent).toBeTruthy();
});

test("should render email field", () => {
  const { getByLabelText } = setup();
  const emailInput = getByLabelText("email", { exact: false });
  expect(emailInput).toBeTruthy();
});

test("should render password field", () => {
  const { getByLabelText } = setup();
  const passwordInput = getByLabelText("Password");
  expect(passwordInput).toBeTruthy();
});

test("should render repeat password field", () => {
  const { getByLabelText } = setup();
  const repeatPasswordInput = getByLabelText("repeat", { exact: false });
  expect(repeatPasswordInput).toBeTruthy();
});

test.skip("should render a signup buton", () => {
  const { getByRole } = setup();
  const signupButton = getByRole("button");
  expect(signupButton).toBeFalsy(true);
});

describe("should signup a user", () => {
  describe("input values are valid", () => {
    test.skip("submit values of the form when signup button is clicked", () => {
      const mockSignupWithEmailandPassword = jest.fn();
      const wrapper = setup();
      wrapper.signupWithEmailandPassword = mockSignupWithEmailandPassword;

      console.log(wrapper.signupWithEmailandPassword);
      const emailInput = findByTestAttr(wrapper, "email-input");
      emailInput.simulate("change", { target: { value: "hello@world.com" } });

      const passwordInput = findByTestAttr(wrapper, "password-input");
      passwordInput.simulate("change", {
        target: { value: "IAmrf4grtAlivehy7" },
      });

      const repeatPasswordInput = findByTestAttr(
        wrapper,
        "repeat-password-input"
      );
      repeatPasswordInput.simulate("change", {
        target: { value: "IAmrf4grtAlivehy7" },
      });

      const signupButton = findByTestAttr(wrapper, "signup-btn");
      signupButton.simulate("click");

      expect(mockSignupWithEmailandPassword).toHaveBeenCalled();
    });
  });

  describe("should display error message when input is invalid", () => {
    describe("email input is invalid", () => {
      test.skip("email input is empty", () => {});
      test.todo("email input contains invalid characters");
      test.todo("input is not an email");
    });

    describe("password input is invalid", () => {
      test.todo("password is too short");
      test.todo("password is too weak");
      test.todo("password and repeat password are different");
    });
  });
});
