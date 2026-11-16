import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração do projeto no Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDVdE37JXNvfElBG0wl7RDhT-AHtlvaIic",
  authDomain: "projetohumor-8cb46.firebaseapp.com",
  projectId: "projetohumor-8cb46",
  storageBucket: "projetohumor-8cb46.firebasestorage.app",
  messagingSenderId: "150044741598",
  appId: "1:150044741598:web:1837ac8b0ae9016395d74f"
};

// Inicializa o Firebase apenas uma vez
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

// Configura a autenticação e a persistência da sessão
let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw error;
  }
}

// Inicializa o banco de dados Firestore
const db = getFirestore(app);

// Disponibiliza os serviços para os outros arquivos
export { app, auth, db };