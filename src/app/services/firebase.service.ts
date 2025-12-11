import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Functions } from '@angular/fire/functions';
import { Storage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  constructor(
    public firestore: Firestore,
    public auth: Auth,
    public functions: Functions,
    public storage: Storage
  ) {}
}
