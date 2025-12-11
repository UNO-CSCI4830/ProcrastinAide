import type { FirebaseOptions } from 'firebase/app';

// Environment configured to localhost for testing purposes
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCz1SilTS3CEzJYndhdMOYwPiHvlBTiut8",
    authDomain: "so-cool-69f99.firebaseapp.com",
    projectId: "so-cool-69f99",
    storageBucket: "so-cool-69f99.firebasestorage.app",
    messagingSenderId: "401476337388",
    appId: "1:401476337388:web:08574d2d5c302c4d916fc9",
    measurementId: "G-ZWP93FV4MQ"
  },
  //useEmulators: true
  // Maybe this needs to be changed to match the actual firebase instance
  emulators: {
    auth: { host: 'localhost', port: 9099 },
    firestore: { host: 'localhost', port: 8080 },
    functions: { host: 'localhost', port: 5001 },
    storage: { host: 'localhost', port: 9199 },
  }
};