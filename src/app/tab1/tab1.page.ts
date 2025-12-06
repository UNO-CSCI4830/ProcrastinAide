import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { RouterModule } from '@angular/router';
import { TriviaTestComponent } from "../trivia-test/trivia-test.component";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton, // ✅ add this
    RouterModule, // ✅ allows [routerLink]
    ExploreContainerComponent,
    TriviaTestComponent
  ],
})
export class Tab1Page {
  constructor() {}
}
