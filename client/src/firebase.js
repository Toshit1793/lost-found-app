// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2oWnKMR4HdlV-jl7GRyCbCEzvkkPtUK0",
  authDomain: "lost-found-app-8ecc5.firebaseapp.com",
  projectId: "lost-found-app-8ecc5",
  storageBucket: "lost-found-app-8ecc5.appspot.com", // ✅ fix here: it should be .appspot.com
  messagingSenderId: "6771429733",
  appId: "1:6771429733:web:6516ced9f715563277518c",
  measurementId: "G-HMS7JLDE3V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
