// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-a7905.firebaseapp.com",
  projectId: "blog-a7905",
  storageBucket: "blog-a7905.appspot.com",
  messagingSenderId: "966253210635",
  appId: "1:966253210635:web:ae81cbf64dcb48206a6b0e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

