// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQFEUIswCNE845eDhWhaRB9MviWJcKw1E",
  authDomain: "task-manager-8cac8.firebaseapp.com",
  projectId: "task-manager-8cac8",
  storageBucket: "task-manager-8cac8.firebasestorage.app",
  messagingSenderId: "637191164803",
  appId: "1:637191164803:web:2dedd8911dfba2cf605cb6",
  measurementId: "G-EEE0LKTGNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
