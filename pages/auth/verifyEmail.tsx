import Button from "@material-ui/core/Button";
import React from "react";
import { sendVerifyEmail } from "../../src/helpers/firebaseAuth";
import Container from "@material-ui/core/Container";

export default function verifyEmail(): JSX.Element {
  return (
    <div className="page verify-email-page">
      <h1 className="ff-serif">Verify your Email</h1>

      <p className="ff-sans">
        Please check your mailbox and confirm your email.
      </p>

      <Button onClick={() => sendVerifyEmail(() => {})}>
        Send a new email
      </Button>
    </div>
  );
}
