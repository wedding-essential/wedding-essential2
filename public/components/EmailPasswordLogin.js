import React from "react";
import { validateAndUpdate, submitHandler } from "../helpers/EmailPasswordForm";

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM":
      const { name, value, hasError, error, touched, isFormValid } =
        action.payload;
      return {
        ...state,
        [name]: { ...state[name], value, hasError, error, touched },
        isFormValid,
      };
    default:
      return state;
  }
};

export default function EmailPasswordLogin() {
  const initialValues = {
    email: { value: "", touched: false, hasError: false, error: "" },
    password: { value: "", touched: false, hasError: true, error: "" },
    isFormValid: false,
  };

  const [state, dispatch] = React.useReducer(formReducer, initialValues);
  const [showFormError, setShowFormError] = React.useState({
    value: false,
    error: "",
  });

  return (
    <div className="container flex flex-col px-5" title="signup-form">
      {showFormError.value && !state.isFormValid && (
        <div title="error-form" className="text-red-600 mt-2 ml-2">
          <p>{showFormError.error}</p>
        </div>
      )}
      <label className="block mt-5" htmlFor="email">
        <span className="text-gray">Email</span>
        <input
          className="form-input mt-1 block w-full"
          type="email"
          name="email"
          id="email"
          value={state.email.value}
          onChange={(e) => {
            validateAndUpdate("email", e.target.value, dispatch, state, false);
          }}
          onBlur={(e) => {
            validateAndUpdate("email", e.target.value, dispatch, state, true);
          }}
        />
      </label>
      {state.email.touched && state.email.hasError && (
        <div title="error-email" className="text-red-600 mt-2 ml-2">
          {state.email.error}
        </div>
      )}

      <label className="block mt-5" htmlFor="password">
        <span className="text-gray">Password</span>
        <input
          className="form-input mt-1 block w-full"
          type="password"
          name="password"
          id="password"
          value={state.password.value}
          onChange={(e) => {
            validateAndUpdate(
              "password",
              e.target.value,
              dispatch,
              state,
              false
            );
          }}
          onBlur={(e) => {
            validateAndUpdate(
              "password",
              e.target.value,
              dispatch,
              state,
              true
            );
          }}
        />
      </label>
      <button
        title="login"
        className=" bg-gold text-gray w-max py-3 px-5 my-4 mx-auto rounded-full justify-self-center"
        onClick={() => {
          submitHandler(setShowFormError, state, "login");
        }}
      >
        Log in
      </button>
    </div>
  );
}