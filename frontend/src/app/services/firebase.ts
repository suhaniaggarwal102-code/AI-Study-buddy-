import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';

import { firebaseConfig } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private app = initializeApp(firebaseConfig);
  private auth = getAuth(this.app);

  async register(email: string, password: string): Promise<User> {
    const result = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    return result.user;
  }

  async login(email: string, password: string): Promise<User> {
    const result = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    return result.user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}