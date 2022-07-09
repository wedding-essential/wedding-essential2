import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import {
  validateAndUpdate,
  formReducer,
} from "../../helpers/EmailPasswordForm";
import { sendResetPasswordEmail } from "../../helpers/firebaseAuth";

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
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item>
        <Typography title="explanation">
          Please enter a valid email address, and we will send you an email to
          reset you password.
        </Typography>
      </Grid>
      {state.isFormValid.show && !state.isFormValid.value && (
        <Grid item>
          <div title="error-form" className="text-red fs-300">
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
        </Grid>
      )}

      <Grid item>
        <TextField
          fullWidth
          autoFocus
          type="email"
          label="email"
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
      <Grid item alignSelf="center">
        <Button color="secondary" href="/auth/couple-login">
          Oh, I remember now !
        </Button>
      </Grid>
      <Grid item alignSelf="center">
        <Button
          variant="contained"
          color="secondary"
          disabled={!state.isFormValid.value}
          title="send-email"
          className="button small-button"
          onClick={() => sendResetPasswordEmail(state.email.value, dispatch)}
        >
          Send me an email
        </Button>
      </Grid>
    </Grid>
  );
}
