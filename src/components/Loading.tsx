import { useRouter } from "next/router";
import React, { useEffect } from "react";
import authContext from "../contexts/authContext";

export default function Loading(props) {
  const router = useRouter();
  const { auth, loading } = authContext.useAuth().authState;

  useEffect(() => {
    const redirect = setTimeout(() => {
      if (!auth && !loading) {
        router.push("/");
      }
    }, 100);
    return () => {
      clearTimeout(redirect);
    };
  }, []);

  return <div className="bg-default">Loading ...</div>;
}
