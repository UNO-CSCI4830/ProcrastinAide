import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { environment } from '../../environments/environment';

const app = initializeApp(environment.firebase);
export const db = getFirestore(app);

if (environment.useEmulators) {
  connectFirestoreEmulator(db, 'localhost', 8080);
  console.log('Connected to FireBase emulator.');
};