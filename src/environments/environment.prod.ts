import type { FirebaseOptions } from 'firebase/app';

export const environment = {
  production: true,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'so-cool-69f99',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
    measurementId: 'YOUR_MEASUREMENT_ID'
  } as FirebaseOptions,
  useEmulators: false
};
