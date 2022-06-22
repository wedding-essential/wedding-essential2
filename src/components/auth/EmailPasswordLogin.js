import React, { useState } from "react";
import {
  validateAndUpdate,
  submitHandler,
} from "../../helpers/EmailPasswordForm";
import authContext from "../../contexts/authContext";
import { formReducer } from "../../helpers/EmailPasswordForm";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function EmailPasswordLogin() {
  const initialValues = {
    email: { value: "", touched: false, hasError: false, error: "" },
    password: { value: "", touched: false, hasError: false, error: "" },
    isFormValid: { value: false, error: "", show: false },
  };

  const [state, dispatch] = React.useReducer(formReducer, initialValues);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { authDispatch } = authContext.useAuth();

  return (
    <>
      <div className="flex flex-col auth-form" title="login-form">
        {state.isFormValid.show && !state.isFormValid.value && (
          <div title="error-form" className="text-red fs-300">
            <p>{state.isFormValid.error}</p>
          </div>
        )}
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            label="Email"
            type="email"
            name="email"
            id="email"
            value={state.email.value}
            onChange={(e) => {
              validateAndUpdate(
                "email",
                e.target.value,
                dispatch,
                state,
                false
              );
            }}
            onBlur={(e) => {
              validateAndUpdate("email", e.target.value, dispatch, state, true);
            }}
            error={state.email.hasError}
            helperText={state.email.error}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            label="password"
            type={showPassword ? "text" : "password"}
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
            endAdornment={
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
            }
            onBlur={(e) => {
              validateAndUpdate(
                "password",
                e.target.value,
                dispatch,
                state,
                true
              );
            }}
            error={state.password.hasError}
            helperText={state.password.error}
          />
        </FormControl>
        <a classname="fs-800 ff-serif" href="/forgotpwd">
          Reset password
        </a>
        <button
          title="login"
          className="button small-button"
          onClick={() => {
            submitHandler(
              state,
              dispatch,
              "login",
              authDispatch,
              initialValues
            );
          }}
        >
          Log in
        </button>
      </div>
    </>
  );
}
