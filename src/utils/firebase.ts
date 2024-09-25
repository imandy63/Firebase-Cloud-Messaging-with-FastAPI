import { firebaseConfig } from "@/config/firebase.config";
import { initializeApp } from "firebase/app";
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
