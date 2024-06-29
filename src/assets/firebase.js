import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const app = firebase.initializeApp({
  apiKey: "AIzaSyCZXzMjgrr-zN4JtSY6bpYcmzsqXiVdE0I",
  authDomain: "book-timer-405d5.firebaseapp.com",
  projectId: "book-timer-405d5",
  storageBucket: "book-timer-405d5.appspot.com",
  messagingSenderId: "1081420247987",
  appId: "1:1081420247987:web:4d0b68458390c1880651c6",
  measurementId: "G-0ZX84EKHKT"
})

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
export default app