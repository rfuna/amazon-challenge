import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAXTbZkOkgVCqFrkBN0dAzUqk-PK9xqc1U",
  authDomain: "challenge-63392.firebaseapp.com",
  projectId: "challenge-63392",
  storageBucket: "challenge-63392.appspot.com",
  messagingSenderId: "670371574231",
  appId: "1:670371574231:web:457528f6e0b8c1a32c9b92",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
