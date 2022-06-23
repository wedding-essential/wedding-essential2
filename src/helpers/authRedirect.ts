import React, { useEffect } from "react";
import { AuthState } from "../contexts/authContext";

export default function authRedirect(context: AuthState, router: any) {
  const { auth, isLoading } = context;

  if (auth && !isLoading && !auth.emailVerified) {
    router.push("/auth/verifyEmail");
  }
  if (auth) {
    router.push("/wedding/list");
  }
}
