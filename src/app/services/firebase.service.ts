import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp;
  private db: Firestore;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.db = getFirestore(this.app);

    if (environment.useEmulators) {
      connectFirestoreEmulator(this.db, 'localhost', 8080);
      console.log('Connected to Firebase emulator.');
    }
  }

  /** Returns Firestore instance */
  getDbInstance(): Firestore {
    return this.db;
  }

  /** Returns FirebaseApp instance */
  getAppInstance(): FirebaseApp {
    return this.app;
  }

  /** Checks if emulator mode is enabled */
  isUsingEmulator(): boolean {
    return environment.useEmulators;
  }
}
