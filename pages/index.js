import WELogo from "../public/components/WELogo";
import GoldenLink from "../public/components/GoldenLink";
import GoogleSocialLogin from "../public/components/GoogleSocialLogin";
import EmailPasswordSignup from "../public/components/EmailPasswordSignup";

export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-pink-pattern bg-cover">
      <main className="container w-3/5 xl:w-4/5 flex flex-col xl:flex-row">
        <div className="w-full xl:w-2/4 flex justify-center">
          <WELogo />
        </div>
        <div className="container flex flex-col mt-6 xl:justify-center xl:w-2/4 xl:px-10">
          <h1>Organize your wedding</h1>
          <GoogleSocialLogin />
          <EmailPasswordSignup />
        </div>
      </main>
    </div>
  );
}
