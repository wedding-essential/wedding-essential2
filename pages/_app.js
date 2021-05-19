import "../styles/globals.css";
import authContext from "../public/contexts/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <authContext.AuthProvider>
      <Component {...pageProps} />
    </authContext.AuthProvider>
  );
}

export default MyApp;
