import authContext from "../contexts/authContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function protectedRoute(WrappedComponent) {
  return (props: any) => {
    const { auth, loading } = authContext.useAuth().authState;
    const router = useRouter();

    useEffect(() => {
      if (!loading && !auth) {
        router.push("/");
      }
    }, [auth, loading]);

    return <WrappedComponent {...props} />;
  };
}
