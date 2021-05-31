import React from "react";
import { validateAndUpdate, formReducer } from "../helpers/EmailPasswordForm";
import { sendResetPasswordEmail } from "../helpers/firebaseAuth";

export default function ForgotPasswordForm() {
  const initialValues = {
    email: { value: "", touched: false, hasError: false, error: "" },
    isFormValid: { value: false, error: "", show: false },
  };

  const [state, dispatch] = React.useReducer(formReducer, initialValues);

  if (state.isFormValid.value && state.isFormValid.show) {
    return (
      <div className="bg-green-300 h-full">
        <p className="text-green-900 text-center py-4">
          Please check your mail box, and login again
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-5">
      <p title="explanation">
        Please enter a valid email address, and we will send you an email to
        reset you password.
      </p>
      {state.isFormValid.show && !state.isFormValid.value && (
        <div title="error-form" className="text-red-600 mt-2 ml-2">
          {state.isFormValid.error === "auth/user-not-found" ? (
            <p>
              Sorry, we didn't find your account. Please{" "}
              <a href="/signup">sign up</a> with your email or{" "}
              <a href="/login">login</a> with Google.
            </p>
          ) : (
            state.isFormValid.error
          )}
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
      <button
        disabled={!state.isFormValid.value}
        title="send-email"
        className=" bg-gold text-gray w-max py-3 px-5 my-4 mx-auto rounded-full justify-self-center focus:outline-none disabled:cursor-not-allowed"
        onClick={() => sendResetPasswordEmail(state.email.value, dispatch)}
      >
        Send me an email
      </button>
    </div>
  );
}
