// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqXAtG9OYr4_xHu9w6N4hGGJhmBrUdfng",
  authDomain: "clone-75af5.firebaseapp.com",
  projectId: "clone-75af5",
  storageBucket: "clone-75af5.firebasestorage.app",
  messagingSenderId: "379967020805",
  appId: "1:379967020805:web:53cd20a28a68d77840616c",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
