import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import axios from "axios";
import firebase from "../../firebase";

beforeAll(() => {
  //Create an account with email/password
  firebase
    .auth()
    .createUserWithEmailAndPassword("email_password2@example.com", "123abcDE@");

  //Create an account with Google
  firebase
    .auth()
    .signInWithCredential(
      firebase.auth.GoogleAuthProvider.credential(
        '{"sub": "abc123", "email": "google2@example.com", "email_verified": true}'
      )
    );
});

afterAll(async () => {
  await axios.delete(
    "http://localhost:9099/emulator/v1/projects/wedding-essential/accounts"
  );
});

describe("renders elements of the component", () => {
  test("should render explanation", () => {
    const { getByTitle } = render(<ForgotPasswordForm />);
    const explanation = getByTitle("explanation");
    expect(explanation).toBeTruthy();
  });

  test("should render email input", () => {
    const { getByLabelText } = render(<ForgotPasswordForm />);
    const emailInput = getByLabelText("email", { exact: false });
    expect(emailInput).toBeTruthy();
  });

  test("should render a send email button", () => {
    const { getByTitle } = render(<ForgotPasswordForm />);
    const sendEmailButton = getByTitle("send-email");
    expect(sendEmailButton).toBeTruthy();
  });
});

describe("should render the correct error message", () => {
  test("should render error message when account is not found", async () => {
    const { getByLabelText, getByText, getByTitle } = render(
      <ForgotPasswordForm />
    );
    const emailInput = getByLabelText("email", { exact: false });
    const sendEmailButton = getByTitle("send-email");
    fireEvent.change(emailInput, { target: { value: "hello@world.com" } });
    fireEvent.click(sendEmailButton);

    await waitFor(() => {
      expect(
        getByText("we didn't find your account", { exact: false })
      ).toBeTruthy();
    });
  });

  test.skip("should render error message when account exists with other OAuth credentials", async () => {
    //Firebase doesn't consider this case as an error.

    const { getByLabelText, getByText, getByTitle } = render(
      <ForgotPasswordForm />
    );
    const emailInput = getByLabelText("email", { exact: false });
    const sendEmailButton = getByTitle("send-email");
    fireEvent.change(emailInput, { target: { value: "google2@example.com" } });
    fireEvent.click(sendEmailButton);

    await waitFor(() => {
      expect(
        getByText("we didn't find your account", { exact: false })
      ).toBeTruthy();
    });
  });
});

describe("should render a confirmation that the email was sent", () => {
  test("should render message to invite user to check mail box", async () => {
    const { getByLabelText, getByText, getByTitle } = render(
      <ForgotPasswordForm />
    );
    const emailInput = getByLabelText("email", { exact: false });
    const sendEmailButton = getByTitle("send-email");
    fireEvent.change(emailInput, {
      target: { value: "email_password2@example.com" },
    });
    fireEvent.click(sendEmailButton);

    await waitFor(() => {
      expect(getByText("check your mail box", { exact: false })).toBeTruthy();
    });
  });
});
