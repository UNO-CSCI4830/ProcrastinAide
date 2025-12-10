import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { TriviaTestComponent } from "../trivia-test/trivia-test.component";

@Component({
  selector: 'app-tab1',
  templateUrl: 'trivia-test.page.html',
  styleUrls: ['trivia-test.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterModule, // ✅ allows [routerLink]
    TriviaTestComponent,
    IonFab,
    IonFabButton,
    IonIcon
  ],
})
export class TriviaTestPage {
  constructor() {}
}
