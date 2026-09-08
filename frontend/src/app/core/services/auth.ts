import { Injectable } from '@angular/core';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

import {
  auth,
  db
} from '../../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User | null = null;

  constructor() {

    onAuthStateChanged(auth, (user) => {

      this.currentUser = user;

    });

  }

  // REGISTER
  async register(
    name: string,
    email: string,
    password: string,
    course: string
  ) {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    // Save user profile in Firestore
    await setDoc(
      doc(db, 'users', user.uid),
      {
        uid: user.uid,
        name: name,
        email: email,
        course: course,
        createdAt: new Date()
      }
    );

    return user;
  }


  // LOGIN
  async login(
    email: string,
    password: string
  ) {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    return userCredential.user;

  }


  // LOGOUT
  async logout() {

    await signOut(auth);

    this.currentUser = null;

  }


  // CHECK LOGIN
  isLoggedIn(): boolean {

    return this.currentUser !== null;

  }


  // GET USER DATA
  async getUserData() {

    if (!this.currentUser) {

      return null;

    }

    const userDocument =
      await getDoc(
        doc(
          db,
          'users',
          this.currentUser.uid
        )
      );

    if (userDocument.exists()) {

      return userDocument.data();

    }

    return null;

  }

}