import React, { useState, useEffect } from "react";
import Image from "next/image";
import GoogleSocialLogin from "../../src/components/auth/GoogleSocialLogin";
import EmailPasswordLogin from "../../src/components/auth/EmailPasswordLogin";
import authContext from "../../src/contexts/authContext";
import { useRouter } from "next/router";
import authRedirectHook from "../../src/helpers/authRedirect";

export default function login(): JSX.Element {
  const [emailFormIsOpen, setEmailFormIsOpen] = useState(false);
  const router = useRouter();
  //TODO: redirect users with verified
  //If auth is not null and email is not verified, redirect to verify email
  const { authState } = authContext.useAuth();

  React.useEffect(() => {
    authRedirectHook(authState, router);
  }, [authState.auth]);

  return (
    <div className="page auth-page">
      <main className="grid-container grid-container--auth text-align-center ff-sans">
        <div className="flow couple-login-flow">
          <h1 className="ff-serif fs-700">Continue planning your wedding</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
            pariatur possimus magni, suscipit accusantium dolor, necessitatibus
            aut, dolores beatae ad totam maxime nesciunt est repudiandae
            corrupti accusamus fugiat veritatis neque!
          </p>
          <div className="flex justify-around">
            <GoogleSocialLogin>Login with Google</GoogleSocialLogin>
            <button
              className="button text-dark ff-sans fs-400 bg-gold "
              onClick={() => setEmailFormIsOpen(!emailFormIsOpen)}
            >
              Login with email
            </button>
          </div>
          <p>
            No account?{" "}
            <a className="ff-sans" href="/auth/couple-signup">
              Create one
            </a>
          </p>
        </div>
        {emailFormIsOpen ? (
          <EmailPasswordLogin />
        ) : (
          <a href="/">
            <Image src="/we-circle-01.svg" width={350} height={350} />
          </a>
        )}
      </main>
    </div>
  );
}
