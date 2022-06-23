import React from "react";
import firebase from "../../firebase";

export interface AuthState {
  auth: any;
  isLoading: boolean;
}
export interface AuthContext {
  authState: AuthState;
  authDispatch: any;
}

const authContext = React.createContext<AuthContext | null>(null);

function useAuth() {
  const context = React.useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

function useProvideAuth() {
  const authReducer = (authState, action) => {
    switch (action.type) {
      case "LOADING":
        return { ...authState, loading: true };

      case "UPDATE_USER":
        return {
          auth: { ...authState.auth, ...action.payload },
          loading: false,
        };

      case "CLEARED_USER":
        return { auth: null, loading: false };
    }
  };

  const [authState, authDispatch] = React.useReducer(authReducer, {
    auth: null,
    loading: false,
  });

  const getUserData = (firebaseUser) => {
    const {
      displayName,
      email,
      emailVerified,
      isAnonymous,
      metadata,
      photoURL,
      multiFactor,
    } = firebaseUser;
    return {
      displayName,
      email,
      emailVerified,
      isAnonymous,
      metadata,
      photoURL,
      multiFactor,
    };
  };

  const authStateChanged = (firebaseAuthState) => {
    if (firebaseAuthState) {
      const userData = getUserData(firebaseAuthState);
      authDispatch({ type: "UPDATE_USER", payload: { ...userData } });
    } else {
      //Workaroung for warning in test. TODO: find a better way
      if (process.env.NODE_ENV !== "test") {
        authDispatch({ type: "CLEARED_USER" });
      }
    }
  };

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return { authState, authDispatch };
}

function AuthProvider(props) {
  const value = useProvideAuth();

  return <authContext.Provider value={value} {...props} />;
}

export default { AuthProvider, useAuth };
