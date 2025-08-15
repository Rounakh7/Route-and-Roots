// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvrtfL1JwqoW54IA8dg-g-IvpNayT9d5I",
  authDomain: "ertms-95087.firebaseapp.com",
  projectId: "ertms-95087",
  storageBucket: "ertms-95087.firebasestorage.app",
  messagingSenderId: "798738350242",
  appId: "1:798738350242:web:7514ebc1e2785a18b117fb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
