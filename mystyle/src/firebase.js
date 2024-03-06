// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// databaseURL might be wrong? will test later
const firebaseConfig = {
  apiKey: "AIzaSyCQUr1G7Re9ZcosKmw1ssrLbC4636KJkuE",
  authDomain: "my-style-febc1.firebaseapp.com",
  projectId: "my-style-febc1",
  storageBucket: "my-style-febc1.appspot.com",
  messagingSenderId: "223320497116",
  appId: "1:223320497116:web:5c49ce8c4dfc8da4798d19",
  measurementId: "G-ERX5TY38M2",
  databaseURL: "https://my-style-febc1.nam5.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const db = getFirestore(app);