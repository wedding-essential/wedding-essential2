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
    case "HANDLE_FORM_ERROR":
      return {
        ...state,
        isFormValid: { ...state.isFormValid, ...action.payload },
      };
    default:
      return state;
  }
};

export default function EmailPasswordSignup() {
  const initialValues = {
    email: { value: "", touched: false, hasError: false, error: "" },
    password: { value: "", touched: false, hasError: false, error: "" },
    repeatPassword: { value: "", touched: false, hasError: false, error: "" },
    isFormValid: { value: false, error: "", show: false },
  };

  const [state, dispatch] = React.useReducer(formReducer, initialValues);

  return (
    <div className="container flex flex-col px-5" title="signup-form">
      {state.isFormValid.show && !state.isFormValid.value && (
        <div title="error-form" className="text-red-600 mt-2 ml-2">
          <p>{state.isFormValid.error}</p>
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
      {state.password.touched && state.password.hasError && (
        <div title="error-password" className="text-red-600 mt-2 ml-2">
          {state.password.error}
        </div>
      )}

      <label className="block mt-5" htmlFor="repeat-password">
        <span className="text-gray">Repeat password</span>
        <input
          className="form-input mt-1 block w-full"
          type="password"
          name="repeat-password"
          id="repeat-password"
          value={state.repeatPassword.value}
          onChange={(e) => {
            validateAndUpdate(
              "repeatPassword",
              e.target.value,
              dispatch,
              state,
              false
            );
          }}
          onBlur={(e) => {
            validateAndUpdate(
              "repeatPassword",
              e.target.value,
              dispatch,
              state,
              true
            );
          }}
        />
      </label>
      {state.repeatPassword.touched && state.repeatPassword.hasError && (
        <div title="error-repeat" className="text-red-600 mt-2 ml-2">
          {state.repeatPassword.error}
        </div>
      )}

      <button
        title="signup"
        className=" bg-gold text-gray w-max py-3 px-5 my-4 mx-auto rounded-full justify-self-center focus:outline-none"
        onClick={() => {
          submitHandler(state, dispatch, "signup");
        }}
      >
        Sign up
      </button>
    </div>
  );
}
