import React from "react";
import { validateAndUpdate, submitHandler } from "../helpers/EmailPasswordForm";
import authContext from "../contexts/authContext";
import { formReducer } from "../helpers/EmailPasswordForm";

export default function EmailPasswordSignup() {
  const initialValues = {
    email: { value: "", touched: false, hasError: false, error: "" },
    password: { value: "", touched: false, hasError: false, error: "" },
    repeatPassword: { value: "", touched: false, hasError: false, error: "" },
    isFormValid: { value: false, error: "", show: false },
  };

  const [state, dispatch] = React.useReducer(formReducer, initialValues);

  const { authDispatch } = authContext.useAuth();

  return (
    <div className="flex flex-col auth-form" title="signup-form">
      {state.isFormValid.show && !state.isFormValid.value && (
        <div title="error-form" className="text-red fs-300">
          <p>{state.isFormValid.error}</p>
        </div>
      )}
      <label
        className="auth-form-label d-block text-dark ff-sans flex flex-col"
        htmlFor="email"
      >
        <span>Email</span>
        <input
          className="form-input mt-3 block w-full"
          type="email"
          name="email"
          id="email"
          placeholder="youremail@wedding.com"
          value={state.email.value}
          onChange={(e) => {
            validateAndUpdate("email", e.target.value, dispatch, state, false);
          }}
          onBlur={(e) => {
            validateAndUpdate("email", e.target.value, dispatch, state, true);
          }}
        />
        {state.email.touched && state.email.hasError && (
          <div title="error-email" className="text-red fs-200 text-align-left">
            {state.email.error}
          </div>
        )}
      </label>

      <label
        className="auth-form-label d-block text-dark ff-sans flex flex-col"
        htmlFor="password"
      >
        <span>Password</span>
        <input
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
        {state.password.touched && state.password.hasError && (
          <div
            title="error-password"
            className="text-red fs-200 text-align-left"
          >
            {state.password.error}
          </div>
        )}
      </label>

      <label
        className="auth-form-label d-block text-dark ff-sans flex flex-col"
        htmlFor="repeat-password"
      >
        <span>Repeat password</span>
        <input
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
        {state.repeatPassword.touched && state.repeatPassword.hasError && (
          <div title="error-repeat" className="text-red fs-200 text-align-left">
            {state.repeatPassword.error}
          </div>
        )}
      </label>

      <button
        title="signup"
        className="button small-button"
        onClick={() => {
          submitHandler(state, dispatch, "signup", authDispatch, initialValues);
        }}
      >
        Sign up
      </button>
    </div>
  );
}
