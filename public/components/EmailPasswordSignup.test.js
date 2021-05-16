import React from "react";
import { validateAndUpdate } from "../helpers/EmailPasswordForm";
import EmailPasswordSignup from "./EmailPasswordSignup";
import { render, fireEvent } from "@testing-library/react";

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

test("should render a signup buton", () => {
  const { getByTitle } = setup();
  const signupButton = getByTitle("signup");
  expect(signupButton).toBeTruthy();
});

describe("should render input level error message when input is not valid", () => {
  test("should render correct error message when email is invalid", async () => {
    const { getByLabelText, findByTitle } = setup();
    const emailInput = getByLabelText("email", { exact: false });
    fireEvent.change(emailInput, { target: { value: "helloworld.com" } });
    fireEvent.blur(emailInput);
    const errorMessage = await findByTitle("error-email");
    expect(errorMessage.textContent).toBe("This is not an email");
  });

  test("should render correct error message when password is invalid", async () => {
    const { getByLabelText, findByTitle } = setup();
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "Gh@jeproFt" } });
    fireEvent.blur(passwordInput);
    const errorMessage = await findByTitle("error-password");
    expect(errorMessage.textContent).toBe(
      "Password is too weak. Use at least two numbers."
    );
  });

  test("should render correct error message when password and repeat passord are different", async () => {
    const { getByLabelText, findByTitle } = setup();
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "123Gh@jeproFt" } });
    const repeatPasswordInput = getByLabelText("repeat", { exact: false });
    fireEvent.change(repeatPasswordInput, {
      target: { value: "1234Gh@jeproFt" },
    });
    fireEvent.blur(repeatPasswordInput);
    const errorMessage = await findByTitle("error-repeat");
    expect(errorMessage.textContent).toBe("Password is different.");
  });
});
