import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sendVerifyEmail } from "../helpers/firebaseAuth";

export default function VerifyEmail() {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <header>
        <h1 className="text-3xl mb-4 text-center">Verify your Email</h1>
      </header>
      <section className="text-xl flex items-center flex-col items-between justify-center">
        <p className="text-center">
          Please check your mailbox and confirm your email.
        </p>
        <br />
        <button onClick={() => sendVerifyEmail(() => {})}>
          Send a new email
        </button>
        <br />
        <Image
          src="/images/reload.png"
          width="30"
          height="30"
          alt="click to refresh page"
          onClick={refreshPage}
        />
      </section>
      <footer className="text-right text-gray">
        <Link href="/createWedding">Skip</Link>
      </footer>
    </div>
  );
}
