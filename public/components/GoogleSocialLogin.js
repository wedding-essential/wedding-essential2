import React from "react";
import firebase from "../../firebase";
import authContext from "../contexts/authContext";
import { signUpwithGoogle } from "../helpers/firebaseAuth";

export default function GoogleSocialLogin() {
  const { authDispatch } = authContext.useAuth();
  const [error, setError] = React.useState();
  return (
    <button
      title="google-login"
      className="uppercase px-4 py-2 mt-3 text-white rounded bg-red-800 hover:bg-red-900"
      onClick={() => {
        signUpwithGoogle(authDispatch);
      }}
    >
      Google
    </button>
  );
}
