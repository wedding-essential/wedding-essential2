import { AuthState } from "../contexts/authContext";

export default function protectedRoutes(authState: AuthState, router: any) {
  const { auth } = authState;
  if (!auth) {
    router.push("/");
  }
}
