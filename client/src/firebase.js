// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNCHbHEUdz2uGqxpr_-eo4cLBvDey-9qY",
  authDomain: "codetusker-c003e.firebaseapp.com",
  projectId: "codetusker-c003e",
  storageBucket: "codetusker-c003e.appspot.com",  // fixed `.app` to `.appspot.com`
  messagingSenderId: "109554356683",
  appId: "1:109554356683:web:a1d5226d08b43ef28ee64e",
  measurementId: "G-K8VRPELRX1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
