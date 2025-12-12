// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
// Import 'inject' from @angular/core
import { inject } from '@angular/core'; 

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Import FirebaseApp for injecting
import { provideFirebaseApp, initializeApp, FirebaseApp } from '@angular/fire/app'; 
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  initializeFirestore,
  provideFirestore,
  enableNetwork // Keep this import for the network check
} from '@angular/fire/firestore';

import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // --- 1. Firebase Core: Initialize the App ONCE ---
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // --- 2. Auth ---
    provideAuth(() => getAuth()),

    // --- 3. Firestore: Inject the App and initialize Firestore ---
    /*provideFirestore(() => {
      // ✅ Inject the existing FirebaseApp instance 
      const app = inject(FirebaseApp);
      
      const firestore = initializeFirestore(app, {
        localCache: undefined  // disables offline persistence
      });

      // Optional: Explicitly try to enable network (as a guard against stale state)
      // Note: This is a best effort and logs an error if it fails.
      enableNetwork(firestore).catch(err => console.error("Could not ensure Firestore network is enabled:", err));

      return firestore;
    })*/
    provideFirestore(() => {
      const app = inject(FirebaseApp); 
      const firestore = initializeFirestore(app, {
        localCache: undefined  // disables offline persistence entirely
      });

      // Make sure the network is enabled!
      enableNetwork(firestore).catch(err => {
          console.error("CRITICAL: Failed to enable Firestore network", err);
      }); 

      return firestore;
    })
  ],
});