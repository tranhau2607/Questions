import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyA3r8OQfVlk3zF745enuEyHgda2fz9N5BY",
    authDomain: "orchidsmanagements.firebaseapp.com",
    projectId: "orchidsmanagements",
    storageBucket: "orchidsmanagements.appspot.com",
    messagingSenderId: "216039397255",
    appId: "1:216039397255:web:871c02c5af65a301316522",
    measurementId: "G-XW7D73YX0G"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);
export { auth,firestore , provider };
