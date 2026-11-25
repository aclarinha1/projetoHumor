
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  browserLocalPersistence
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

 const firebaseConfig = {
    apiKey: "AIzaSyDVdE37JXNvfElBG0wl7RDhT-AHtlvaIic",
    authDomain: "projetohumor-8cb46.firebaseapp.com",
    projectId: "projetohumor-8cb46",
    storageBucket: "projetohumor-8cb46.firebasestorage.app",
    messagingSenderId: "150044741598",
    appId: "1:150044741598:web:1837ac8b0ae9016395d74f"
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

let auth;

try {
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
  });
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw error;
  }
}

const db = getFirestore(app);

export { app, auth, db };
