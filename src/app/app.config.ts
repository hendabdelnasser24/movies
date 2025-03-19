import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration, withI18nSupport } from '@angular/platform-browser';

const firebaseConfig = {
  apiKey: "AIzaSyBZv5VWfgSMDhiuzYSV2qB6Pb2OHARpOQA",
  authDomain: "movies-web-7e98c.firebaseapp.com",
  projectId: "movies-web-7e98c",
  storageBucket: "movies-web-7e98c.firebasestorage.app",
  messagingSenderId: "970481470296",
  appId: "1:970481470296:web:d707cb1d9394106b26f32d"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(withI18nSupport()),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideAnimations()
  ],
};
