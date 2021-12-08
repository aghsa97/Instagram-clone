import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBFc6tND25A4tXPh9aG6ds-ZgHOJ1lJKn8",
    authDomain: "instagram-test-9122e.firebaseapp.com",
    projectId: "instagram-test-9122e",
    storageBucket: "instagram-test-9122e.appspot.com",
    messagingSenderId: "687855187116",
    appId: "1:687855187116:web:3ce722ae0c4557e7a41b09"
  };

const firebase = Firebase.initializeApp(firebaseConfig);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };