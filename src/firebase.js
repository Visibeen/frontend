
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCevniqH3WI6ccRWWMyIqgiuNwnvWuH1jM",
  authDomain: "my-app-aaa08.firebaseapp.com",
  projectId: "my-app-aaa08",
  storageBucket: "my-app-aaa08.firebasestorage.app",
  messagingSenderId: "385177856380",
  appId: "1:385177856380:web:b4c0808c1e67237c461cf9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier, signOut };