// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWAd3g34S1xEkTNvdP9jahK6ODx4-Ii50",
  authDomain: "nextjs-app-7d9ee.firebaseapp.com",
  projectId: "nextjs-app-7d9ee",
  storageBucket: "nextjs-app-7d9ee.appspot.com",
  messagingSenderId: "662938650938",
  appId: "1:662938650938:web:e694bb73940649db842803",
  measurementId: "G-FKJ2YMKNG9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);