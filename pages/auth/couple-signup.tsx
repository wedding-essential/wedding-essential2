import React, { useState, useEffect } from "react";
import Image from "next/image";
import GoogleSocialLogin from "../../src/components/auth/GoogleSocialLogin";
import EmailPasswordSignup from "../../src/components/auth/EmailPasswordSignup";
import authRedirect from "../../src/helpers/authRedirect";
import authContext from "../../src/contexts/authContext";
import { useRouter } from "next/router";

export default function CoupleSignup(): JSX.Element {
  const [emailFormIsOpen, setEmailFormIsOpen] = useState(false);
  const { authState } = authContext.useAuth();
  const router = useRouter();

  useEffect(() => {
    authRedirect(authState, router);
  }, [authState]);

  return (
    <div className="page auth-page">
      <main className="grid-container grid-container--auth text-align-center ff-sans">
        <div className="flow couple-login-flow">
          <h1 className="ff-serif fs-700">
            Start planning the best day of your life
          </h1>
          {/* TODO improve description on sign up page */}
          <p>Wedding planning is the key to a successful wedding.</p>
          <ul>
            <li>plan and share your wedding with your family and friends</li>
            <li>manage & send your invitations in a single place</li>
            <li>track your wedding progress</li>
          </ul>
          <h2>Create an account now</h2>
          <div className="flex justify-around">
            <GoogleSocialLogin>Sign up with Google</GoogleSocialLogin>
            <button
              className="button text-dark ff-sans fs-400 bg-gold "
              onClick={() => setEmailFormIsOpen(!emailFormIsOpen)}
            >
              Sign up with email
            </button>
          </div>
          <div>
            <p>
              Already have an account?
              <a className="ff-sans" href="/auth/couple-login">
                Login
              </a>
            </p>
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
