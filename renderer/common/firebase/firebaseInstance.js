// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfNusgsVWvBuUxOXFo2Srisj54-IWAlj0",
  authDomain: "chat-desktop-app-a31d2.firebaseapp.com",
  projectId: "chat-desktop-app-a31d2",
  storageBucket: "chat-desktop-app-a31d2.appspot.com",
  messagingSenderId: "562194668101",
  appId: "1:562194668101:web:0c2eca5f8d853467fc612c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const realtimeDbService = getDatabase(app);
