import React from "react";
import EmailPasswordSignup from "./EmailPasswordSignup";
import { render, fireEvent, waitFor } from "@testing-library/react";
import firebase from "../../firebase";

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

describe("should render form error message when signup button is clicked", () => {
  test("should not render an error message if all fields are valid", async () => {
    const { getByLabelText, getByTitle, queryByTitle } = setup();
    const emailInput = getByLabelText("email", { exact: false });
    const passwordInput = getByLabelText("Password");
    const repeatPasswordInput = getByLabelText("repeat", { exact: false });
    const signupButton = getByTitle("signup");

    fireEvent.change(emailInput, { target: { value: "hello@world.com" } });
    fireEvent.change(passwordInput, { target: { value: "123Gh@jeproFt" } });
    fireEvent.change(repeatPasswordInput, {
      target: { value: "123Gh@jeproFt" },
    });

    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(queryByTitle("error-form")).toBeNull();
    });
  });
  test("should render an error message if at least one field is invalid", async () => {
    const { getByLabelText, getByTitle } = setup();
    const emailInput = getByLabelText("email", { exact: false });
    const passwordInput = getByLabelText("Password");
    const repeatPasswordInput = getByLabelText("repeat", { exact: false });
    const signupButton = getByTitle("signup");

    fireEvent.change(emailInput, { target: { value: "helloworld.com" } });
    fireEvent.change(passwordInput, { target: { value: "123Gh@jeproFt" } });
    fireEvent.change(repeatPasswordInput, {
      target: { value: "123Gh@jeproFt" },
    });
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(getByTitle("error-form")).toBeTruthy();
    });
  });
  test.todo("should render a message if user already exists");
});

/* test("should render a message when user already exists", async () => {
    const { getByLabelText, getByTitle, queryByTitle } = setup();
    const emailInput = getByLabelText("email", { exact: false });
    const passwordInput = getByLabelText("Password");
    const repeatPasswordInput = getByLabelText("repeat", { exact: false });
    const signupButton = getByTitle("signup");

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123Gh@jeproFt" } });
    fireEvent.change(repeatPasswordInput, {
      target: { value: "123Gh@jeproFt" },
    });
    await fireEvent.click(signupButton);

    const formError = await queryByTitle("error-form");
    expect(formError).toBeInTheDocument();
  }); */

//TODO: setup a user in authEmulator and delete user after test
