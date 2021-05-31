import firebase from "../../firebase";

export const signUpwithEmailAndPassword = (formState, dispatch) => {
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
};

export const signInwithEmailAndPassword = (formState, dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(formState.email.value, formState.password.value)
    .catch((err) => {
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
      // An error happened.
    });
};

export const sendVerifyEmail = (setVerifyEmailSent) => {
  var user = firebase.auth().currentUser;
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
