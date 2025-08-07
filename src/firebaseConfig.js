// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBabDkLhT2dhkhnDVY1zRZRL8vr3ciqe6s",
  authDomain: "chatapp-1d018.firebaseapp.com",
  projectId: "chatapp-1d018",
  storageBucket: "chatapp-1d018.appspot.com",
  messagingSenderId: "891754520839",
  appId: "1:891754520839:web:e4c505e9f4a79ca76865a2",
};

// Init Firebase + Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
