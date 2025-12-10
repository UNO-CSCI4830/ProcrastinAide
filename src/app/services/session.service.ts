import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SessionModel } from '../data/session.model';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private db: Firestore;
  private sessionsCollection;

  constructor(private firebaseService: FirebaseService) {
    // reuse the same Firestore instance your teammate set up
    this.db = this.firebaseService.getDbInstance() as Firestore;
    this.sessionsCollection = collection(this.db, 'sessions');
  }

  /** Stream of sessions from Firestore */
  get sessions$(): Observable<SessionModel[]> {
    return collectionData(this.sessionsCollection, {
      idField: 'id',
    }) as Observable<SessionModel[]>;
  }

  /** Call this when a focus session finishes */
  addSession(session: Omit<SessionModel, 'id'>) {
    return addDoc(this.sessionsCollection, session);
  }
}
