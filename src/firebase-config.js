import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBElKs418Zz0KTDv2nQLTADTKu-kIc7mig",
  authDomain: "reactdemo-first.firebaseapp.com",
  databaseURL: "https://reactdemo-first-default-rtdb.firebaseio.com",
  projectId: "reactdemo-first",
  storageBucket: "reactdemo-first.appspot.com",
  messagingSenderId: "587676743519",
  appId: "1:587676743519:web:7c1a58539d3786bec3e8ea",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);