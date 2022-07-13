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
  getDocs, // grab all the data one time
  onSnapshot, // real time listener
  addDoc,
  deleteDoc,
  doc, // reference to a document
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
//auth service
const auth = getAuth();

// collection ref
const colRef = collection(db, "books");

// queries
const q = query(
  colRef,
  orderBy("createdAt") // by default ascending
  // where("author", "==", "Angela"),
  // orderBy("title", "asc")
);
// we place the q as the first parameter to onSnapshot function to get the result

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
  // we put q instead of colRef to perform a query
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
    createdAt: serverTimestamp(),
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

// get a single document
const docRef = doc(db, "books", "P11wBHyTqowjWfXalozz");

getDoc(docRef).then((doc) => {
  // to get it one time
  console.log(doc.data(), doc.id);
});

onSnapshot(docRef, (doc) => {
  // to keep listening to that document changes
  console.log(doc.data(), doc.id);
});

// updating a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset();
  });
});

// signing users up
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created: ", cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});
