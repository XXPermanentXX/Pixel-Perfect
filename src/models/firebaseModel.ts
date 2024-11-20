import { firebaseConfig } from "./apiConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { initializeFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {});
export const auth = getAuth(app);

