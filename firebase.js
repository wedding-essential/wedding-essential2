// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_projectId}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_projectId}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId,
};
//process.env.NEXT_PUBLIC_FIREBASE_apiKey
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  if (process.env.NODE_ENV === "test") {
    firebaseConfig = {
      apiKey: "myFak3AP1K3y",
      projectId: "my-fake-wedding",
    };
  }
  firebase.initializeApp(firebaseConfig);
}

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  const auth = firebase.auth();
  auth.useEmulator("http://localhost:9099");
}
export default firebase;
