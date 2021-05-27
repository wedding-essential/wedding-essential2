import firebase from "../../firebase";

export const validateInput = (name, value, formState) => {
  let hasError = false,
    error = "";
  switch (name) {
    case "email":
      if (value.trim() === "") {
        hasError = true;
        error = "Email cannot be empty";
      } else if (!/^\S{1,}@\S{2,}\.\S{2,}$/.test(value)) {
        hasError = true;
        error = "This is not an email";
      } else if (/[< > ´]/.test(value)) {
        hasError = true;
        error = "What are you trying to do ?";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "password":
      if (value.trim() === "") {
        hasError = true;
        error = "Password cannot be empty";
      } else if (value.length < 8) {
        hasError = true;
        error = "Password must be at least 8 characters long";
      } else if (!/^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z].*[a-z])/.test(value)) {
        hasError = true;
        error =
          "Password is too weak. Use at least two uppercase letters and three lowercase letters.";
      } else if (!/^(?=.*[!@#$&*])/.test(value)) {
        hasError = true;
        error =
          "Password is too weak. Use at least one special characters (!@#$&*).";
      } else if (!/^(?=.*[0-9].*[0-9])/.test(value)) {
        hasError = true;
        error = "Password is too weak. Use at least two numbers.";
      } else {
        hasError = false;
        error = "";
      }
      break;
    case "repeatPassword":
      if (value !== formState.password.value) {
        hasError = true;
        error = "Password is different.";
      } else {
        hasError = false;
        error = "";
      }
      break;
    default:
      break;
  }
  return { hasError, error };
};

export const validateAndUpdate = (
  name,
  value,
  dispatch,
  formState,
  touched
) => {
  const { hasError, error } = validateInput(name, value, formState);

  let isFormValid = { value: true, error: "" };
  for (const key in formState) {
    const item = formState[key];
    // Check if the current field has error
    if (key === name && hasError) {
      isFormValid = { value: false, error: "Please fill the fields correctly" };
      break;
    } else if (key !== name && item.hasError) {
      // Check if any other field has error
      isFormValid = { value: false, error: "Please fill the fields correctly" };
      break;
    }
  }

  dispatch({
    type: "UPDATE_FORM",
    payload: {
      name,
      value,
      hasError,
      error,
      touched,
      isFormValid,
    },
  });
};

export const submitHandler = (formState, dispatch, formType) => {
  switch (formType) {
    case "signup":
      if (!formState.isFormValid.value) {
        dispatch({
          type: "HANDLE_FORM_ERROR",
          payload: {
            value: false,
            error: "Please fill all the field correctly",
            show: true,
          },
        });
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            formState.email.value,
            formState.password.value
          )
          .catch((err) => {
            dispatch({
              type: "HANDLE_FORM_ERROR",
              payload: { value: false, error: err.message, show: true },
            });
          });
      }
      break;
    case "login":
      if (formState.email.hasError) {
        setShowError({
          value: true,
          error: "Please fill all the field correctly",
        });
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(
            formState.email.value,
            formState.password.value
          )
          .catch((err) => {
            console.log({ err });
            dispatch({
              type: "HANDLE_FORM_ERROR",
              payload: {
                value: false,
                error: "Invalid credentials",
                show: true,
              },
            });
          });
      }
  }
};
