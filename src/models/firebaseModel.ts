import { firebaseConfig } from "./apiConfig";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);