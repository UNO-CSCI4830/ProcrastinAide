import type { FirebaseOptions } from 'firebase/app';

export const environment = {
  production: true,
  firebase: {
    /*apiKey: 'YOUR_API_KEY',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'so-cool-69f99',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
    measurementId: 'YOUR_MEASUREMENT_ID'*/
    apiKey: "AIzaSyCz1SilTS3CEzJYndhdMOYwPiHvlBTiut8",
    authDomain: "so-cool-69f99.firebaseapp.com",
    projectId: "so-cool-69f99",
    storageBucket: "so-cool-69f99.firebasestorage.app",
    messagingSenderId: "401476337388",
    appId: "1:401476337388:web:186b7bbf3214271a916fc9",
    measurementId: "G-S1XY0BBW7S" 
  } as FirebaseOptions,
  useEmulators: false
};
