import React, { useState } from "react";
import {
  validateAndUpdate,
  submitHandler,
} from "../../helpers/EmailPasswordForm";
import authContext from "../../contexts/authContext";
import { formReducer } from "../../helpers/EmailPasswordForm";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function EmailPasswordSignup() {
  const initialValues = {
    email: { value: "", touched: false, hasError: false, error: "" },
    password: { value: "", touched: false, hasError: false, error: "" },
    repeatPassword: { value: "", touched: false, hasError: false, error: "" },
    isFormValid: { value: false, error: "", show: false },
  };

  const [state, dispatch] = React.useReducer(formReducer, initialValues);

  // Handle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { authDispatch } = authContext.useAuth();

  return (
    <div className="flex flex-col auth-form" title="signup-form">
      {state.isFormValid.show && !state.isFormValid.value && (
        <div title="error-form" className="text-red fs-300">
          <p>{state.isFormValid.error}</p>
        </div>
      )}

      <TextField
        type="email"
        label="Email"
        id="email"
        placeholder="youremail@wedding.com"
        value={state.email.value}
        onChange={(e) => {
          validateAndUpdate("email", e.target.value, dispatch, state, false);
        }}
        onBlur={(e) => {
          validateAndUpdate("email", e.target.value, dispatch, state, true);
        }}
        error={state.email.touched && state.email.hasError}
        helperText={
          state.email.touched && state.email.hasError ? state.email.error : null
        }
      />

      <TextField
        type={showPassword ? "text" : "password"}
        label="Password"
        id="password"
        value={state.password.value}
        onChange={(e) => {
          validateAndUpdate("password", e.target.value, dispatch, state, false);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onBlur={(e) => {
          validateAndUpdate("password", e.target.value, dispatch, state, true);
        }}
        error={state.password.touched && state.password.hasError}
        helperText={
          state.password.touched && state.password.hasError
            ? state.password.error
            : null
        }
      />

      <TextField
        type={showRepeatPassword ? "text" : "password"}
        label="Repeat password"
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowRepeatPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
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
        error={state.repeatPassword.hasError}
        helperText={state.repeatPassword.error}
      />

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
