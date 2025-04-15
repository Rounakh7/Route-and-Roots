// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkw7dSZPVBt8ZrqbR0JplYqu91ErluhNs",
  authDomain: "test-45df1.firebaseapp.com",
  projectId: "test-45df1",
  storageBucket: "test-45df1.appspot.com", // ✅ fixed here
  messagingSenderId: "544590772131",
  appId: "1:544590772131:web:deffe398abd1f204c70c16",
  measurementId: "G-Z820302T0B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
