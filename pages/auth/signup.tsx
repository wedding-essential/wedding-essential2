import React from "react";
import EmailPasswordSignup from "../../public/components/EmailPasswordSignup";
import GoogleSocialLogin from "../../public/components/GoogleSocialLogin";
import CenteredWindow from "../../public/components/helpers/CenteredWindow";
import authContext from "../../public/contexts/authContext";
import { useRouter } from "next/router";

export default function signup(): JSX.Element {
  const router = useRouter();
  const { authState } = authContext.useAuth();

  React.useEffect(() => {
    if (authState.auth && !authState.auth.emailVerified) {
      router.push("/verifyEmail");
    }
  }, []);

  return (
    <CenteredWindow>
      <header>
        <h1 className="text-2xl mb-4 text-center">Ready to signup ?</h1>
      </header>
      <section className="flex flex-col justify-center items-center ">
        <GoogleSocialLogin />
        <span className="my-4">or</span>
        <EmailPasswordSignup />
      </section>
      <footer>
        <span className="text-gray">
          Do you want to login instead ?
          <a className="text-black" href="/login">
            Login
          </a>
        </span>
      </footer>
    </CenteredWindow>
  );
}