import React from "react";
import EmailPasswordLogin from "./EmailPasswordLogin";
import { render, fireEvent } from "@testing-library/react";

const setup = () => {
  return render(<EmailPasswordLogin />);
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

test("should render a login buton", () => {
  const { getByTitle } = setup();
  const signupButton = getByTitle("login");
  expect(signupButton).toBeTruthy();
});

test("should render correct error message when email is invalid", async () => {
  const { getByLabelText, findByTitle } = setup();
  const emailInput = getByLabelText("email", { exact: false });
  fireEvent.change(emailInput, { target: { value: "helloworld.com" } });
  fireEvent.blur(emailInput);
  const errorMessage = await findByTitle("error-email");
  expect(errorMessage.textContent).toBe("This is not an email");
});

describe("should render form error message when signup button is clicked", () => {
  test("should not render an error message if all fields are valid", () => {
    const { getByLabelText, getByTitle, queryByTitle } = setup();
    const emailInput = getByLabelText("email", { exact: false });
    const passwordInput = getByLabelText("Password");
    const loginButton = getByTitle("login");
    fireEvent.change(emailInput, { target: { value: "hello@world.com" } });
    fireEvent.change(passwordInput, { target: { value: "123Gh@jeproFt" } });
    fireEvent.click(loginButton);
    const formError = queryByTitle("error-form");
    expect(formError).toBeNull();
  });

  test("should render an error message if at least one field is invalid", () => {
    const { getByLabelText, getByTitle, queryByTitle } = setup();
    const emailInput = getByLabelText("email", { exact: false });
    const passwordInput = getByLabelText("Password");
    const loginButton = getByTitle("login");
    fireEvent.change(emailInput, { target: { value: "helloworld.com" } });
    fireEvent.change(passwordInput, { target: { value: "123Gh@jeproFt" } });
    fireEvent.click(loginButton);
    const formError = queryByTitle("error-form");
    expect(formError).toBeInTheDocument();
  });
});
