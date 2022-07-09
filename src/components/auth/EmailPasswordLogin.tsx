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
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid";

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
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item>
        {state.isFormValid.show && !state.isFormValid.value && (
          <div title="error-form" className="text-red fs-300">
            <p>{state.isFormValid.error}</p>
          </div>
        )}
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          label="Email"
          type="email"
          id="email"
          value={state.email.value}
          onChange={(e) => {
            validateAndUpdate("email", e.target.value, dispatch, state, false);
          }}
          onBlur={(e) => {
            validateAndUpdate("email", e.target.value, dispatch, state, true);
          }}
          error={state.email.touched && state.email.hasError}
          helperText={
            state.email.touched && state.email.hasError
              ? state.email.error
              : null
          }
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
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
            validateAndUpdate(
              "password",
              e.target.value,
              dispatch,
              state,
              true
            );
          }}
        />
      </Grid>
      <Grid item>
        <a className="ff-serif text-align-center" href="/auth/forgotpwd">
          Reset password
        </a>
      </Grid>
      <Grid item alignSelf="center">
        <Button
          variant="contained"
          title="login"
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
        </Button>
      </Grid>
    </Grid>
  );
}
