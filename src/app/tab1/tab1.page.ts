import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { RouterModule, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../data/task.model';
import { AlertController } from '@ionic/angular';
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
  constructor(
    private taskService: TaskService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async showRecommendationDemo() {
    const recommended = await this.taskService.recommendNextTask();
    if (!recommended) {
      const a = await this.alertCtrl.create({ header: 'No recommendation', message: 'No pending tasks to recommend', buttons: ['OK'] });
      await a.present();
      return;
    }

    const message = `${recommended.name}${recommended.due ? ' — due ' + new Date(recommended.due).toLocaleString() : ''}${recommended.priority ? ' — priority ' + recommended.priority : ''}`;

    const alert = await this.alertCtrl.create({
      header: 'Recommended next task',
      message,
      buttons: [
        { text: 'Go to Tasks', handler: () => this.router.navigate(['/tabs/tab5']) },
        { text: 'Dismiss', role: 'cancel' }
      ]
    });
    await alert.present();
  }
}
