import authContext from "../contexts/authContext";
import { useRouter } from "next/router";
import Loading from "../components/Loading";

export default function protectedRoute(WrappedComponent) {
  return (props) => {
    const { auth, loading } = authContext.useAuth().authState;

    // If there is no auth object we redirect to "/" page.
    if (auth && !loading) {
      return <WrappedComponent {...props} />;
    }
    // If this is an accessToken we just render the component that was passed with all its props
    return <Loading />;
    // If we are on server, return null
  };
}
