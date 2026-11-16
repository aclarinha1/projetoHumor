
import {
  createUserWithEmailAndPassword,
  updateProfile,
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
