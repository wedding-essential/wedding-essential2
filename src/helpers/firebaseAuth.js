import firebase from "../../firebase";
import { createUser } from "../helpers/firebaseUser";

export const signUpwithEmailAndPassword = (formState, dispatch) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(
      formState.email.value,
      formState.password.value
    )
    .then((userCredential) => {
      const user = userCredential.user;
      const { email, emailVerified } = user;
      firebase.auth().useDeviceLanguage();
      user.sendEmailVerification();
    })
    .catch((err) => {
      dispatch({
        type: "HANDLE_FORM_ERROR",
        payload: { value: false, error: err.message, show: true },
      });
    });
};

export const signInwithEmailAndPassword = (formState, dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(formState.email.value, formState.password.value)
    .catch(() => {
      dispatch({
        type: "HANDLE_FORM_ERROR",
        payload: {
          value: false,
          error: "Invalid credentials",
          show: true,
        },
      });
    });
};

export const signUpwithGoogle = (authDispatch) => {
  authDispatch({ type: "LOADING" });
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().useDeviceLanguage();
  firebase
    .auth()
    .signInWithPopup(provider)
    .catch((error) => {
      console.log(error);
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...

      //TODO: "Handling account-exists-with-different-credential Errors"
      // https://firebase.google.com/docs/auth/web/google-signin
    });
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
};

export const sendVerifyEmail = (setVerifyEmailSent = () => {}) => {
  var user = firebase.auth().currentUser;
  firebase.auth().useDeviceLanguage();
  user
    .sendEmailVerification()
    .then(function () {
      setVerifyEmailSent({ sent: true, error: "" });
      // Email sent.
    })
    .catch(function (error) {
      setVerifyEmailSent({ sent: false, error: error.message });
      // An error happened.
    });
};

export const sendResetPasswordEmail = (emailAddress, dispatch) => {
  firebase
    .auth()
    .sendPasswordResetEmail(emailAddress)
    .then(function () {
      dispatch({
        type: "HANDLE_FORM_ERROR",
        payload: { value: true, error: "", show: true },
      });
    })
    .catch(function (err) {
      dispatch({
        type: "HANDLE_FORM_ERROR",
        payload: { value: false, error: err.code, show: true },
      });
    });
};

export const getAuthToken = () => {
  firebase
    .auth()
    .getIdToken()
    .then(function (token) {
      return token;
    });
};
