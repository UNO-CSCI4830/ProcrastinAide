import type { FirebaseOptions } from 'firebase/app';

// Environment configured to localhost for testing purposes
export const environment = {
  production: false,
  firebase: {
    apiKey: 'APIdontcare',
    authDomain: 'localhost',
    projectId: 'procrastinaide-test',
    storageBucket: 'this-is-a-bucket',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'idontneednostinkinappid',
    measurementId: 'imperial' 
  } as FirebaseOptions,
  useEmulators: true
  // Maybe this needs to be changed to match the actual firebase instance
};
