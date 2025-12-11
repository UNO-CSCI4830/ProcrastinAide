import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import {
  Auth,
  connectAuthEmulator,
} from '@angular/fire/auth';
import {
  Firestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import {
  Functions,
  connectFunctionsEmulator,
} from '@angular/fire/functions';
import {
  Storage,
  connectStorageEmulator,
} from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class FirebaseInitService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private functions: Functions,
    private storage: Storage,
  ) {
    this.init();
  }

  private async ping(host: string, port: number): Promise<boolean> {
    try {
      const res = await fetch(`http://${host}:${port}`);
      return res.ok || res.status === 400;
    } catch {
      return false;
    }
  }

  private async init() {
    const e = environment.emulators;

    if (!e) return;

    // --- AUTH ---
    if (await this.ping(e.auth.host, e.auth.port)) {
      connectAuthEmulator(this.auth, `http://${e.auth.host}:${e.auth.port}`);
      console.log('🔥 Auth emulator connected');
    }

    // --- FIRESTORE ---
    if (await this.ping(e.firestore.host, e.firestore.port)) {
      connectFirestoreEmulator(
        this.firestore, e.firestore.host, e.firestore.port
      );
      console.log('🔥 Firestore emulator connected');
    }

    // --- FUNCTIONS ---
    if (await this.ping(e.functions.host, e.functions.port)) {
      connectFunctionsEmulator(
        this.functions, e.functions.host, e.functions.port
      );
      console.log('🔥 Functions emulator connected');
    }

    // --- STORAGE ---
    if (await this.ping(e.storage.host, e.storage.port)) {
      connectStorageEmulator(
        this.storage, e.storage.host, e.storage.port
      );
      console.log('🔥 Storage emulator connected');
    }
  }
}