import Image from "next/image";
import GoogleSocialLogin from "../public/components/GoogleSocialLogin";
import EmailPasswordSignup from "../public/components/EmailPasswordSignup";

export default function Home(): JSX.Element {
  return (
    <div className="landing-page bg-default">
      <main className="grid-container">
        <div>
          <Image src="/we-circle-01.svg" width={350} height={350} />
        </div>
        <div className="text-align-center flow">
          <a
            href="/auth/couple-signup"
            className="golden-link ff-serif fs-700 text-gold"
          >
            Getting Married ?
          </a>
          <p className="ff-serif fs-400 text-grey"> OR </p>
          <a
            href="/auth/guest-login"
            className="golden-link ff-serif fs-700 text-gold"
          >
            Attending a wedding ?
          </a>
        </div>
      </main>
    </div>
  );
}
