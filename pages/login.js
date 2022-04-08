import React from "react";
import EmailPasswordLogin from "../public/components/EmailPasswordLogin";
import GoogleSocialLogin from "../public/components/GoogleSocialLogin";
import CenteredWindow from "../public/components/helpers/CenteredWindow";

export default function login() {
  //TODO: redirect users with verified
  //If auth is not null and email is not verified, redirect to verify email

  return (
    <CenteredWindow>
      <header>
        <h1 className="text-2xl mb-4 text-center">Welcome back</h1>
      </header>
      <section className="flex flex-col justify-center items-center ">
        <GoogleSocialLogin />
        <span className="my-4">or</span>
        <EmailPasswordLogin />
      </section>
      <footer>
        <span className="text-gray">
          Do you need an account ?{" "}
          <a className="text-black" href="/signup">
            Signup
          </a>
        </span>
      </footer>
    </CenteredWindow>
  );
}
