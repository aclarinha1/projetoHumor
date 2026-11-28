import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { auth } from './firebase';

export async function cadastrarUsuario(nome, email, senha) {
  const credencial = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    senha
  );

  await updateProfile(credencial.user, {
    displayName: nome.trim(),
  });

  return credencial.user;
}

export async function entrarUsuario(email, senha) {
  const credencial = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    senha
  );

  return credencial.user;
}

export async function sairUsuario() {
  await signOut(auth);
}
