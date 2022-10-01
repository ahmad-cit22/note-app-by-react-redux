// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzo5mYgjhWK2-iOHUvP0oFIX_QtYPkZMI",
  authDomain: "note-taking-app-by-react.firebaseapp.com",
  databaseURL: "https://note-taking-app-by-react-default-rtdb.firebaseio.com",
  projectId: "note-taking-app-by-react",
  storageBucket: "note-taking-app-by-react.appspot.com",
  messagingSenderId: "475210641760",
  appId: "1:475210641760:web:bdf52fc5658d8f3aa86e05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;
