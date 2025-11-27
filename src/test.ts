// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/* ----------------------------------------------------------
   FIX FOR IONIC <ion-icon> CRASHING IN KARMA TESTS
   ---------------------------------------------------------- */

// 1) Define a mock IonIcon component so tests don’t try to load real SVGs
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-icon',
  template: '<span></span>',
})
class IonIconMockComponent {
  @Input() name: string | undefined;
}

// 2) Register the mock globally so all tests automatically use it
(globalThis as any).IonIconMockComponent = IonIconMockComponent;

// 3) Patch Ionic’s icon loader so it does NOT use real asset URLs
import { defineCustomElements } from '@ionic/core/loader';

// Prevent Ionic from resolving actual URLs during tests
(window as any).Ionic = {
  config: {
    assetPaths: {
      'ionicons': '/base/node_modules/ionicons/dist/ionicons'
    }
  }
};

// Register Ionic custom elements, but icons will NOT crash now
defineCustomElements(window);

/* ---------------------------------------------------------- */

// Initialize Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
