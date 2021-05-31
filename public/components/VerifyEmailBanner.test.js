import React from "react";
import VerifyEmailBanner from "./VerifyEmailBanner";
import { render, fireEvent, waitFor } from "@testing-library/react";
import authContext from "../contexts/authContext";

const setup = (authProviderValue) => {
  return render(
    <authContext.AuthProvider value={authProviderValue}>
      <VerifyEmailBanner />
    </authContext.AuthProvider>
  );
};

describe("render banner", () => {});

test(`shoud not render banner when user's email is verified`, () => {
  const { queryByTitle } = setup({
    authState: {
      auth: { emailVerified: true },
      loading: false,
    },
  });
  expect(queryByTitle("banner")).toBeNull();
});
test(`shoud not render banner when no user is logged in`, () => {
  const { queryByTitle } = setup({
    authState: {
      auth: null,
      loading: false,
    },
  });
  expect(queryByTitle("banner")).toBeNull();
});

test(`should render banner when user's email is not verified`, () => {
  const { queryByTitle } = setup({
    authState: {
      auth: { emailVerified: false },
      loading: false,
    },
  });
  expect(queryByTitle("banner")).toBeTruthy();
});

describe("should render correct message", () => {
  test("should render a message to send a verification email", () => {
    const { queryByTitle } = setup({
      authState: {
        auth: { emailVerified: false },
        loading: false,
      },
    });
    const verifyButton = queryByTitle("send-email");
    expect(verifyButton).toBeTruthy();
  });

  test.skip("should render a message that confirm an email has been sent", () => {
    const { queryByTitle } = setup({
      authState: {
        auth: { email: "email_verification@example.com", emailVerified: false },
        loading: false,
      },
    });
    const verifyButton = queryByTitle("send-email");
    fireEvent.click(verifyButton);

    expect(verifyButton).toBeTruthy();
  });
});
