import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAK9dtl8dZvEWVrv_wCffpnUGEzvIoRnJk",
  authDomain: "a-10-6a586.firebaseapp.com",
  projectId: "a-10-6a586",
  storageBucket: "a-10-6a586.firebasestorage.app",
  messagingSenderId: "965132711768",
  appId: "1:965132711768:web:43214a26df83ccdfb6572d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;