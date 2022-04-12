import "../styles/globals.css";
import authContext from "../public/contexts/authContext";
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <authContext.AuthProvider>
      <Component {...pageProps} />
    </authContext.AuthProvider>
  );
}

export default MyApp;
