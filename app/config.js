import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getFirestore } from "firebase/firestore"
import { initializeApp } from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyATV_8Y31yDpUkQx6XP0vAmpTm-667bgw8",
  authDomain: "rayanotes-1a1ee.firebaseapp.com",
  projectId: "rayanotes-1a1ee",
  storageBucket: "rayanotes-1a1ee.firebasestorage.app",
  messagingSenderId: "238639456880",
  appId: "1:238639456880:web:4dabf32ecaaf40f9e50ab5"

};

if ( !firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth()
export {firebase};
export {auth};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


