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

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

if (!firebase.apps.length) {
  // Change configs for test and development environments
  if (
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "development"
  ) {
    firebaseConfig.apiKey = "myFak3AP1K3y";
    firebaseConfig.projectId = "my-fake-wedding";
  }

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

// Setup Firebase Emulator for test and development environments
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  const db = firebase.firestore();
  const auth = firebase.auth();

  auth.useEmulator("http://localhost:9099");
  db.useEmulator("localhost", 8080);
}

export default firebase;
