import {  initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCJZ-iMIDcYQdNQp9_0lkkrdJy4fAzbVsU",
  authDomain: "tickets-c914c.firebaseapp.com",
  projectId: "tickets-c914c",
  storageBucket: "tickets-c914c.appspot.com",
  messagingSenderId: "95316181102",
  appId: "1:95316181102:web:a24f5fd69c3944c7b3a67f",
  measurementId: "G-WR36Q07F9T"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {auth, db, storage};
