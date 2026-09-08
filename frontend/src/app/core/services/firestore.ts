import { Injectable } from '@angular/core';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() {}

  async saveQuizResult(
    subject: string,
    score: number,
    total: number
  ) {
    try {
      const quizResultsRef = collection(db, 'quizResults');

      await addDoc(quizResultsRef, {
        subject: subject,
        score: score,
        total: total,
        percentage: Math.round((score / total) * 100),
        date: new Date()
      });

      console.log('Quiz result saved successfully!');
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  }
}