import React from "react";
import ForgotPasswordForm from "../public/components/ForgotPasswordForm";
import CenteredWindow from "../public/components/helpers/CenteredWindow";

export default function forgotpwd(): JSX.Element {
  return (
    <div className="forgot-pwd-page bg-default">
      <main className="grid-container grid-container--forgot-pwd text-align-center ff-sans">
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
