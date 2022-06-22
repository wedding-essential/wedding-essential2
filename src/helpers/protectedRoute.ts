import React from "react";
import { useRouter } from "next/router";

export default function protectedRoutes(user) {
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/");
    }
  });
}
