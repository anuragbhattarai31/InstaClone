
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAb6_diPGslT3kLvimCHZcqqPXSh6GCG5s",
  authDomain: "media-gram-6e8dd.firebaseapp.com",
  projectId: "media-gram-6e8dd",
  storageBucket: "media-gram-6e8dd.appspot.com",
  messagingSenderId: "1087904692269",
  appId: "1:1087904692269:web:4e07f9c8bb44614b1ea0a4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app ,auth,firestore,storage}