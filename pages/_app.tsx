import "../styles/globals.css";
import "../styles/reset.css";
import Head from "next/head";
import authContext from "../public/contexts/authContext";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Wedding Essentials</title>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
          @import
          url('https://fonts.googleapis.com/css2?family=Quattrocento&display=swap');
        </style>
      </Head>
      <authContext.AuthProvider>
        <Component {...pageProps} />
      </authContext.AuthProvider>
    </>
  );
}

export default MyApp;
