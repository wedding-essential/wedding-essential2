import React from "react";
import firebase from "../../../firebase";
import authContext from "../../contexts/authContext";
import { signUpwithGoogle } from "../../helpers/firebaseAuth";

export default function GoogleSocialLogin({ children }) {
  const { authDispatch } = authContext.useAuth();
  const [error, setError] = React.useState();
  return (
    <button
      title="google-login"
      aria-selected="false"
      className="d-block button text-dark ff-sans fs-400 bg-gold "
      onClick={() => {
        signUpwithGoogle(authDispatch);
      }}
    >
      {children}
    </button>
  );
}
