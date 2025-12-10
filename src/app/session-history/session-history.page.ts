import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TaskService } from '../services/task.service';
import { TaskModel } from '../data/task.model';

// Ionicons
import { addIcons } from 'ionicons';
import { arrowBackOutline, timeOutline, flameOutline } from 'ionicons/icons';

addIcons({ arrowBackOutline, timeOutline, flameOutline });

interface SessionItem {
  task: string;
  date: Date;
  pomodoros: number;
  duration: number;
}

@Component({
  selector: 'app-session-history',
  templateUrl: './session-history.page.html',
  styleUrls: ['./session-history.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonFab,
    IonFabButton,
    CommonModule,
    DatePipe,
    RouterModule
  ]
})
export class SessionHistoryPage {
  // what the template uses
  sessions: SessionItem[] = [];

  constructor(private taskService: TaskService) {
    // Subscribe to the same task stream Tab 5 uses
    this.taskService.tasks$.subscribe((tasks: TaskModel[]) => {
      this.sessions = tasks.map((t) => {
        // date: prefer due date, fall back to createdAt, fall back to "now"
        const dateSource: any = t.due ?? t.createdAt ?? new Date().toISOString();
        const date = new Date(dateSource);

        // duration in minutes (default 25 if missing)
        const duration = t.duration ?? 25;

        // rough pomodoro count (25-minute blocks, at least 1)
        const pomodoros = Math.max(1, Math.round(duration / 25));

        return {
          task: t.name,
          date,
          pomodoros,
          duration
        };
      });
    });
  }
}
