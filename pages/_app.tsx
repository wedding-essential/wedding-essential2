import "../styles/globals.css";
import "../styles/reset.css";
import Head from "next/head";
import authContext from "../src/contexts/authContext";
import { AppProps } from "next/app";
import Container from "@mui/material/Container";
import VerifyEmailBanner from "../src/components/auth/VerifyEmailBanner";
import { ThemeProvider } from "@mui/material/styles";
import { greenGoldTheme } from "../styles/muiTheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={greenGoldTheme}>
      <div className="bg-default">
        <Head>
          <title>Wedding Essentials</title>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
            @import
            url('https://fonts.googleapis.com/css2?family=Quattrocento&display=swap');
            @import
            url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
            ) @import
            url(https://fonts.googleapis.com/icon?family=Material+Icons");
          </style>
        </Head>
        <authContext.AuthProvider>
          <Container>
            <VerifyEmailBanner />
            <Component {...pageProps} />
          </Container>
        </authContext.AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
