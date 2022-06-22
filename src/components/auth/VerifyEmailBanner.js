import React from "react";
import { sendVerifyEmail } from "../helpers/firebaseAuth";
import authContext from "../contexts/authContext";

export default function VerifyEmailBanner() {
  const [verifyEmailSent, setVerifyEmailSent] = React.useState({
    sent: false,
    error: "",
  });
  const { auth, loading } = authContext.useAuth().authState;

  if (!auth) {
    return null;
  }

  if (auth && auth.emailVerified && !loading) {
    return null;
  }

  return (
    <div title="banner" className="bg-red-400 py-3 cursor-default">
      {!verifyEmailSent.sent && !verifyEmailSent.error && (
        <p className="text-center text-lg">
          Your email is not verified.&nbsp;
          <span
            title="send-email"
            className="text-white cursor-pointer"
            onClick={() => {
              sendVerifyEmail(setVerifyEmailSent);
            }}
          >
            Send me a verification email.
          </span>
        </p>
      )}
      {!verifyEmailSent.sent && verifyEmailSent.error && (
        <p className="text-center text-lg">{verifyEmailSent.error}</p>
      )}
      {verifyEmailSent.sent && (
        <p className="text-center text-lg">Please check your email box</p>
      )}
    </div>
  );
}
