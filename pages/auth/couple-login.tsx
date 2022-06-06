import React, { useState } from "react";
import Image from "next/image";
import GoogleSocialLogin from "../../public/components/GoogleSocialLogin";
import EmailPasswordLogin from "../../public/components/EmailPasswordLogin";
import EmailPasswordSignup from "../../public/components/EmailPasswordSignup";
import CenteredWindow from "../../public/components/helpers/CenteredWindow";

export default function login(): JSX.Element {
  const [emailFormIsOpen, setEmailFormIsOpen] = useState(false);
  //TODO: redirect users with verified
  //If auth is not null and email is not verified, redirect to verify email

  return (
    <div className="auth-page bg-default">
      <header>
        <a className="fs-500 ff-sans" href="/auth/couple-signup">
          Are you a guest?
        </a>
      </header>
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
