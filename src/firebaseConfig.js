import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC3oWSDj_QHeuoFd6wGTt2lAPVqvV0mIXE",
  authDomain: "hambisa-68ee0.firebaseapp.com",
  databaseURL: "https://hambisa-68ee0-default-rtdb.firebaseio.com",
  projectId: "hambisa-68ee0",
  storageBucket: "hambisa-68ee0.appspot.com",
  messagingSenderId: "514574773849",
  appId: "1:514574773849:web:de2dbe49e4847ee35d8b48",
  measurementId: "G-VJJHP9L16R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
