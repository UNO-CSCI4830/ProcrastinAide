import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'

// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';

import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // ✔ Initialize Firebase app properly
    provideFirebaseApp(() => {
      console.log("🔥 Firebase config:", environment.firebase);
      return initializeApp(environment.firebase);
    }),

    // ✔ Initialize Firestore + emulator
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
        console.log('🔥 Connected Firestore to emulator');
      }
      return firestore;
    }),

    // ✔ Initialize Auth + emulator (this was missing)
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099');
        console.log("🔥 Connected Auth to emulator");
      }
      return auth;
    }),

    importProvidersFrom(
      AppRoutingModule,
      FormsModule,
      IonicModule.forRoot(),
      CommonModule
    ),
  ],
});
