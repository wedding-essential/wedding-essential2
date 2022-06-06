import React from "react";
import EmailPasswordSignup from "./EmailPasswordSignup";
import { render, fireEvent, waitFor } from "@testing-library/react";
import authContext from "../contexts/authContext";
import firebase from "../../firebase";
import axios from "axios";

const setup = (providerProps = {}) => {
  return render(
    <authContext.AuthProvider {...providerProps}>
      <EmailPasswordSignup />
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

  /* This afterAll causes the following warning:  
 
 Warning: An update to AuthProvider inside a test was not wrapped in act(...).
  When testing, code that causes React state updates should be wrapped into act(...):

  Firebase.auth.authStateChanged is triggered when the authEmulator is cleared
  Which updates the authState in the authContext after the tests are run.

  Issue: https://github.com/testing-library/react-testing-library/issues/281
  I don't know how to solve it for now
    TODO: Check this article
  https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
*/
});

describe("should render elements without error", () => {
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

  describe("should render an error message when user already exist...", () => {
    test("email/password account exist, attempt with same email/password", async () => {
      const { getByLabelText, getByTitle } = setup();
      const emailInput = getByLabelText("email", { exact: false });
      const passwordInput = getByLabelText("Password");
      const repeatPasswordInput = getByLabelText("repeat", { exact: false });
      const signupButton = getByTitle("signup");

      fireEvent.change(emailInput, {
        target: { value: "email_password@example.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "123Gh@jeproFt" } });
      fireEvent.change(repeatPasswordInput, {
        target: { value: "123Gh@jeproFt" },
      });
      fireEvent.click(signupButton);

      await waitFor(() => {
        expect(getByTitle("error-form").innerHTML).toMatch("already in use");
      });
    });

    test("Google account exists, attempt with same email/password", async () => {
      const { getByLabelText, getByTitle } = setup();
      const emailInput = getByLabelText("email", { exact: false });
      const passwordInput = getByLabelText("Password");
      const repeatPasswordInput = getByLabelText("repeat", { exact: false });
      const signupButton = getByTitle("signup");

      fireEvent.change(emailInput, {
        target: { value: "google@example.com" },
      });
      fireEvent.change(passwordInput, { target: { value: "123Gh@jeproFt" } });
      fireEvent.change(repeatPasswordInput, {
        target: { value: "123Gh@jeproFt" },
      });
      fireEvent.click(signupButton);

      await waitFor(() => {
        expect(getByTitle("error-form").innerHTML).toMatch("already in use");
      });
    });
  });
});
