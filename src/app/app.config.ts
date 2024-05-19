import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import firebase from "firebase/compat/app";
//import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import initializeApp = firebase.initializeApp;
import {AngularFireModule, FIREBASE_OPTIONS} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA9rdHtN6fbC6diaWfXw4A4S4wtV5baWg",
  authDomain: "lakasvadasz-portal.firebaseapp.com",
  projectId: "lakasvadasz-portal",
  storageBucket: "lakasvadasz-portal.appspot.com",
  messagingSenderId: "177201877219",
  appId: "1:177201877219:web:0f5cc18d2976a612b735d6",
  databaseURL: "https://lakasvadasz-portal-default-rtdb.europe-west1.firebasedatabase.app/"
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    {provide: FIREBASE_OPTIONS, useValue: firebaseConfig},
    //importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"lakasvadasz-portal","appId":"1:177201877219:web:0f5cc18d2976a612b735d6","storageBucket":"lakasvadasz-portal.appspot.com","apiKey":"AIzaSyBA9rdHtN6fbC6diaWfXw4A4S4wtV5baWg","authDomain":"lakasvadasz-portal.firebaseapp.com","messagingSenderId":"177201877219"}))),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom([AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule, AngularFireDatabaseModule, AngularFirestoreModule]), provideAnimationsAsync(),
  ]
};
