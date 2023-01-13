import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPf8HyJ1KVWMw36e0xdAhNjvj0RLhMrCg",
  authDomain: "house-marketplace-cfa65.firebaseapp.com",
  projectId: "house-marketplace-cfa65",
  storageBucket: "house-marketplace-cfa65.appspot.com",
  messagingSenderId: "531559363097",
  appId: "1:531559363097:web:9e5f23be7d5f84644af088",
  measurementId: "G-Y15X76WP06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export default { app, db };
