import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyCYOiMUELenu0iCkuGsySR8xL_Zud26cm8",
  authDomain: "edvio-215b5.firebaseapp.com",
  projectId: "edvio-215b5",
  storageBucket: "edvio-215b5.firebasestorage.app",
  messagingSenderId: "449886645485",
  appId: "1:449886645485:web:8d3b5f076ae4d99ee070e4",
  measurementId: "G-DG612R3HZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;