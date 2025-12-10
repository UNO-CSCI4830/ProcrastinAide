import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { TriviaTestPage } from './trivia-test.page';
import { TriviaTestComponent } from './trivia-test.component';

@NgModule({
  declarations: [
    TriviaTestPage,
    TriviaTestComponent   // <-- REGISTER YOUR COMPONENT HERE
  ],
  imports: [
    CommonModule,
    IonicModule,          // <-- REQUIRED for ion-list, ion-item, etc.
    RouterModule.forChild([
      {
        path: '',
        component: TriviaTestPage
      }
    ])
  ]
})
export class TriviaTestModule {}