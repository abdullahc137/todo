// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNyYmAMFQmUzA6vDJazMabh_uBAAu-p0M",
  authDomain: "todo-list-es511.firebaseapp.com",
  databaseURL: "https://todo-list-es511-default-rtdb.firebaseio.com",
  projectId: "todo-list-es511",
  storageBucket: "todo-list-es511.appspot.com",
  messagingSenderId: "1040264077090",
  appId: "1:1040264077090:web:23a876a3803a92cf13cf7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();