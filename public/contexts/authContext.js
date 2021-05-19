import React from "react";

const authContext = React.createContext();

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

      case "LOADED_USER":
        //TODO: auth should be updated with the object from Firebase
        return { auth: {}, loading: false };

      case "CLEARED_USER":
        return { auth: null, loading: false };
    }
  };

  const [authState, authDispatch] = React.useReducer(authReducer, {
    auth: null,
    loading: false,
  });

  return { authState, authDispatch };
}

function AuthProvider(props) {
  const value = useProvideAuth();

  return <authContext.Provider value={value} {...props} />;
}

export default { AuthProvider, useAuth };
