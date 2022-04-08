import firebase from "../../firebase";
import {
  signUpwithEmailAndPassword,
  signInwithEmailAndPassword,
} from "../helpers/firebaseAuth";

export const formReducer = (state, action) => {
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
    case "CLEAR_FORM":
      return { ...action.payload };
    default:
      return state;
  }
};

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

export const submitHandler = (
  formState,
  dispatch,
  formType,
  authDispatch,
  initialState
) => {
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
        authDispatch({ type: "LOADING" });
        signUpwithEmailAndPassword(formState, dispatch);
        dispatch({ type: "CLEAR_FORM", payload: initialState });
      }
      break;
    case "login":
      if (formState.email.hasError) {
        dispatch({
          type: "HANDLE_FORM_ERROR",
          payload: {
            value: false,
            error: "Please fill all the field correctly",
            show: true,
          },
        });
      } else {
        authDispatch({ type: "LOADING" });
        signInwithEmailAndPassword(formState, dispatch);
        dispatch({ type: "CLEAR_FORM", payload: initialState });
      }
  }
};
