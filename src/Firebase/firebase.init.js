// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC1Ha3T5GdgVdGQFwbYoz3r8UBIo_q44c",
  authDomain: "work-loop-app.firebaseapp.com",
  projectId: "work-loop-app",
  storageBucket: "work-loop-app.firebasestorage.app",
  messagingSenderId: "328649920608",
  appId: "1:328649920608:web:84c08b99374988dbbcf305"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)