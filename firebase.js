// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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

let firebaseAuth;
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebaseAuth = firebase.auth();
}

export { firebaseAuth };
export default firebase;
