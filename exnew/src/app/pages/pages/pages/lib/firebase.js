// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrgSJ49qK3Dfl40KVFZGFPL8eEyYEfzec",
  authDomain: "crud-70688.firebaseapp.com",
  projectId: "crud-70688",
  storageBucket: "crud-70688.firebasestorage.app",
  messagingSenderId: "480631098333",
  appId: "1:480631098333:web:9eb4e2f391cfc797a34434",
  measurementId: "G-D3S1MK1D7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
