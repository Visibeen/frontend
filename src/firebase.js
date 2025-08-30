
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCPP1SVNsTCbgkyYUJXnpyr_dmk9PTU3E",
  authDomain: "visibeen-b4696.firebaseapp.com",
  projectId: "visibeen-b4696",
  storageBucket: "visibeen-b4696.firebasestorage.app",
  messagingSenderId: "617228925126",
  appId: "1:617228925126:web:d701b275df4c9762c5bfc7",
};
// apiKey: "AIzaSyBCPP1SVNsTCbgkyYUJXnpyr_dmk9PTU3E",
//   authDomain: "visibeen-b4696.firebaseapp.com",
//   projectId: "visibeen-b4696",
//   storageBucket: "visibeen-b4696.firebasestorage.app",
//   messagingSenderId: "617228925126",
//   appId: "1:617228925126:web:d701b275df4c9762c5bfc7",
//   measurementId: "G-62SN948MB6"
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, signOut };