import React from "react";
import ForgotPasswordForm from "../public/components/ForgotPasswordForm";
import CenteredWindow from "../public/components/helpers/CenteredWindow";

export default function forgotpwd(): JSX.Element {
  return (
    <CenteredWindow>
      <ForgotPasswordForm />
    </CenteredWindow>
  );
}
