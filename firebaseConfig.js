// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMjHGfHzVreuvigPTTiCDNEUVdYcLnmJg",
  authDomain: "abc-hospital-4c87e.firebaseapp.com",
  projectId: "abc-hospital-4c87e",
  storageBucket: "abc-hospital-4c87e.appspot.com",
  messagingSenderId: "733274012783",
  appId: "1:733274012783:web:7a280a953ad1f197b3e19a"
}
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);