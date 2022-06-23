import React from "react";
import ForgotPasswordForm from "../../src/components/auth/ForgotPasswordForm";

export default function forgotpwd(): JSX.Element {
  return (
    <div className="page bg-default">
      <main className="grid-container grid-container--forgot-pwd text-align-center ff-sans">
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
