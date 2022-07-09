import React from "react";
import Button from "@mui/material/Button";
import authContext from "../../contexts/authContext";
import { signUpwithGoogle } from "../../helpers/firebaseAuth";

export default function GoogleSocialLogin({ children }) {
  const { authDispatch } = authContext.useAuth();
  return (
    <Button
      variant="contained"
      title="google-login"
      aria-selected="false"
      onClick={() => {
        signUpwithGoogle(authDispatch);
      }}
    >
      {children}
    </Button>
  );
}
