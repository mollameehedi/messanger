// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw0uige8zG9C6ZNjqa3nUX2gM1Rz6Lb1A",
  authDomain: "mymessanger-fe0ec.firebaseapp.com",
  projectId: "mymessanger-fe0ec",
  storageBucket: "mymessanger-fe0ec.appspot.com",
  messagingSenderId: "924826253121",
  appId: "1:924826253121:web:e3b6d6206b4cba766e13c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;