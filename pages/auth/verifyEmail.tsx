import React from "react";
import CenteredWindow from "../../public/components/helpers/CenteredWindow";
import VerifyEmail from "../../public/components/VerifyEmail";
export default function verifyEmail(): JSX.Element {
  //TODO: redirect users with verified
  //If auth is not null and email is not verified, redirect to verify email

  return (
    <CenteredWindow>
      <VerifyEmail />
    </CenteredWindow>
  );
}
