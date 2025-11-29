import type { FirebaseOptions } from 'firebase/app';

// Environment configured to localhost for testing purposes
export const environment = {
  production: false,
  firebase: {
    /*apiKey: 'APIdontcare',
    authDomain: 'localhost',
    projectId: 'procrastinaide-test',
    storageBucket: 'this-is-a-bucket',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'idontneednostinkinappid',
    measurementId: 'imperial'*/
    apiKey: "AIzaSyCz1SilTS3CEzJYndhdMOYwPiHvlBTiut8",
    authDomain: "so-cool-69f99.firebaseapp.com",
    projectId: "so-cool-69f99",
    //storageBucket: "so-cool-69f99.firebasestorage.app",
    storageBucket: "sp-cool-69f99.appspot.com",
    messagingSenderId: "401476337388",
    appId: "1:401476337388:web:186b7bbf3214271a916fc9",
    measurementId: "G-S1XY0BBW7S" 
  } as FirebaseOptions,
  useEmulators: true
  // Maybe this needs to be changed to match the actual firebase instance
};


/*
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCz1SilTS3CEzJYndhdMOYwPiHvlBTiut8",

  authDomain: "so-cool-69f99.firebaseapp.com",

  projectId: "so-cool-69f99",

  storageBucket: "so-cool-69f99.firebasestorage.app",

  messagingSenderId: "401476337388",

  appId: "1:401476337388:web:186b7bbf3214271a916fc9",

  measurementId: "G-S1XY0BBW7S"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
*/
