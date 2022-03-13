import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCDY3_CsUEeQp2HE7P0hNQklhXZBFzmX-s",
  authDomain: "crud-27e16.firebaseapp.com",
  databaseURL:
    "https://crud-27e16-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crud-27e16",
  storageBucket: "crud-27e16.appspot.com",
  messagingSenderId: "48224353946",
  appId: "1:48224353946:web:aff79e7e5218c6127f6923",
};

const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
