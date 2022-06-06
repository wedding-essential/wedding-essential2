import React from "react";
import EmailPasswordLogin from "./EmailPasswordLogin";
import { render, fireEvent, waitFor } from "@testing-library/react";
import authContext from "../contexts/authContext";
import axios from "axios";
import firebase from "../../firebase";
const setup = (providerProps = {}) => {
  return render(
    <authContext.AuthProvider {...providerProps}>
      <EmailPasswordLogin />
    </authContext.AuthProvider>
  );
};

beforeAll(() => {
  //Create an account with email/password
  firebase
    .auth()
    .createUserWithEmailAndPassword("email_password@example.com", "123abcDE@");

  //Create an account with Google
  firebase
    .auth()
    .signInWithCredential(
      firebase.auth.GoogleAuthProvider.credential(
        '{"sub": "abc123", "email": "google@example.com", "email_verified": true}'
      )
    );
});

afterAll(async () => {
  await axios.delete(
    "http://localhost:9099/emulator/v1/projects/wedding-essential/accounts"
  );
});

describe("render elements without error", () => {
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
});

describe("should render input level error message", () => {
  const inputErrorSetup = async () => {
    const { getByLabelText, findByTitle } = setup();
    const emailInput = getByLabelText("email", { exact: false });
    fireEvent.change(emailInput, { target: { value: "helloworld.com" } });
    fireEvent.blur(emailInput);
    const errorMessage = await findByTitle("error-email");
    return errorMessage;
  };

  test("should render correct error message when email is invalid", async () => {
    const errorMessage = await inputErrorSetup();
    expect(errorMessage.textContent).toBe("This is not an email");
  });
});

describe("should render form-level error message when login button is clicked", () => {
  const formErrorSetup = (emailValue, passwordValue) => {
    const { getByLabelText, getByTitle, queryByTitle } = setup();
    const emailInput = getByLabelText("email", { exact: false });
    const passwordInput = getByLabelText("Password");
    const loginButton = getByTitle("login");
    fireEvent.change(emailInput, { target: { value: emailValue } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: passwordValue } });
    fireEvent.click(loginButton);

    /* const formError = getByTitle("error-form"); */
    return { getByTitle, queryByTitle };
  };

  test("should not render an error message if all fields are valid and account exists", async () => {
    const formError = formErrorSetup(
      "email_password@example.com",
      "123Gh@jeproFt"
    );
    await waitFor(() => {
      expect(formError.queryByTitle("error-form")).toBeNull();
    });
  });

  test("should render an error message if at least one field is invalid", async () => {
    const formError = formErrorSetup("helloworld.com", "123Gh@jeproFt");
    await waitFor(() => {
      expect(formError.getByTitle("error-form")).toBeTruthy();
    });
  });

  test("should render an error message if account does not exist", async () => {
    const formError = formErrorSetup("hello@world.com", "123Gh@jeproFt");
    await waitFor(() => {
      expect(formError.getByTitle("error-form")).toBeTruthy();
    });
  });

  test("should render an error message if account exists with Google login", async () => {
    const formError = formErrorSetup("google@example.com", "123Gh@jeproFt");
    await waitFor(() => {
      expect(formError.getByTitle("error-form")).toBeTruthy();
    });
  });
});
