// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMGfvF5mrVc5Tl7vSjPMqZCyuextw07o8",
  authDomain: "sunflower-assignment10.firebaseapp.com",
  projectId: "sunflower-assignment10",
  storageBucket: "sunflower-assignment10.firebasestorage.app",
  messagingSenderId: "928337325783",
  appId: "1:928337325783:web:0e479bc7a39471710e4a92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;




