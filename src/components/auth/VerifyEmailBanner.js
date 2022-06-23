import React, { useEffect, useState } from "react";
import { sendVerifyEmail } from "../../helpers/firebaseAuth";
import authContext from "../../contexts/authContext";

export default function VerifyEmailBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [verifyEmailSent, setVerifyEmailSent] = useState({
    sent: false,
    error: "",
  });
  const { auth, loading } = authContext.useAuth().authState;

  useEffect(() => {
    if (
      window.location.pathname === "/auth/verifyEmail" ||
      window.location.pathname === "/"
    ) {
      setIsVisible(false);
    }

    if (!auth) {
      setIsVisible(false);
    }

    if (auth && auth?.emailVerified && !loading) {
      setIsVisible(false);
    }
  }, [auth]);

  if (!isVisible) {
    return <></>;
  }

  return (
    <div title="banner" className="ff-sans fs-400 text-align-center">
      {!verifyEmailSent.sent && !verifyEmailSent.error && (
        <p className="text-center text-lg">
          Your email is not verified.&nbsp; Please check your mailbox.&nbsp;
          <span
            title="send-email"
            className="ff-serif"
            onClick={() => {
              sendVerifyEmail(setVerifyEmailSent);
            }}
          >
            Send new verification.
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
