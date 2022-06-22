import firebase from "../../firebase";
const db = firebase.firestore();
//User = { email, emailVerified, token}
export const createUser = (user) => {
  db.collection("user")
    .add({ user })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};
