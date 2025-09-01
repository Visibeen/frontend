
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAM1lwIvLSurC8qxexyyX9dtzk_5odqzdA",
  authDomain: "myapi-430807.firebaseapp.com",
  projectId: "myapi-430807",
  storageBucket: "myapi-430807.firebasestorage.app",
  messagingSenderId: "231513186315",
  appId: "1:231513186315:web:8e9d1d2f6fa2987bcc270e",
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