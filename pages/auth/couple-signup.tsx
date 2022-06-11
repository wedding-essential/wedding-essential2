import React, { useState } from "react";
import Image from "next/image";
import GoogleSocialLogin from "../../public/components/auth/GoogleSocialLogin";
import EmailPasswordSignup from "../../public/components/auth/EmailPasswordSignup";

export default function CoupleSignup(): JSX.Element {
  const [emailFormIsOpen, setEmailFormIsOpen] = useState(false);

  return (
    <div className="auth-page bg-default">
      <header>
        <a
          className="d-block text-align-right fs-500 ff-sans"
          href="/auth/couple-login"
        >
          Already planning a wedding?
        </a>
      </header>
      <main className="grid-container grid-container--auth text-align-center ff-sans">
        <div className="flow couple-login-flow">
          <h1 className="ff-serif fs-700">Create a new wedding plan</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
            pariatur possimus magni, suscipit accusantium dolor, necessitatibus
            aut, dolores beatae ad totam maxime nesciunt est repudiandae
            corrupti accusamus fugiat veritatis neque!
          </p>
          <div className="flex justify-around">
            <GoogleSocialLogin>Sign up with Google</GoogleSocialLogin>
            <button
              className="button text-dark ff-sans fs-400 bg-gold "
              onClick={() => setEmailFormIsOpen(!emailFormIsOpen)}
            >
              Sign up with email
            </button>
          </div>
        </div>
        <div>
          {emailFormIsOpen ? (
            <EmailPasswordSignup />
          ) : (
            <a href="/">
              <Image src="/we-circle-01.svg" width={350} height={350} />
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
