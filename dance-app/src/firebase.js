// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2v8AsIlSlg-LOHmP9-7Z1OxN9_bB3lMY",
  authDomain: "danceapp-f6a07.firebaseapp.com",
  projectId: "danceapp-f6a07",
  storageBucket: "danceapp-f6a07.firebasestorage.app",
  messagingSenderId: "404080376984",
  appId: "1:404080376984:web:0c1ff6fc8a96b87d9be4ed",
  measurementId: "G-TR3HL92K2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);