// ==== Firebase 8 we used to import all firebase/app part of the library to only use the function initializeApp =============
// (import firebase from 'firebase/app'
// firebase.initializeApp(firebaseConfig))

// Firebase 9 // only import one function

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAUJKVJmrQ8PxDeXYmIG19VcFRo8jHCgBg",
  authDomain: "fir-9-start-4ffc9.firebaseapp.com",
  projectId: "fir-9-start-4ffc9",
  storageBucket: "fir-9-start-4ffc9.appspot.com",
  messagingSenderId: "663584947171",
  appId: "1:663584947171:web:f4b47ad2a8aaee1a663ed6",
};

initializeApp(firebaseConfig);
