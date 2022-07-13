// === Firebase 8 we used to import all firebase/app part of the library to only use the function initializeApp =============
// (import firebase from 'firebase/app'
// firebase.initializeApp(firebaseConfig));
// const db = firebase.firestore();
// db.collection('books);

// Firebase 9 // only import one function

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs, // grab the data one time
  onSnapshot, // real time listener
  addDoc,
  deleteDoc,
  doc, // reference to a document
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUJKVJmrQ8PxDeXYmIG19VcFRo8jHCgBg",
  authDomain: "fir-9-start-4ffc9.firebaseapp.com",
  projectId: "fir-9-start-4ffc9",
  storageBucket: "fir-9-start-4ffc9.appspot.com",
  messagingSenderId: "663584947171",
  appId: "1:663584947171:web:f4b47ad2a8aaee1a663ed6",
};

// init firebase app
initializeApp(firebaseConfig);

// init firestore service (connect to db)
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// get the collection data only once (snapshot at the exact time only)
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// Real time listener to changes on the collection
// and firing the cb function with a snapshot of the updated data
onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    // clear input fields
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
