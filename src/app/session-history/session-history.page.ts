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

// ✅ NEW imports for Ionicons
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

// ✅ Register the back arrow icon
addIcons({ arrowBackOutline });

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
  sessions = [
    { task: 'Math Homework', date: new Date('2025-10-29T14:00:00'), pomodoros: 3, duration: 75 },
    { task: 'CS Project', date: new Date('2025-10-30T16:30:00'), pomodoros: 2, duration: 50 },
    { task: 'Reading Notes', date: new Date('2025-10-31T12:00:00'), pomodoros: 1, duration: 25 }
  ];

  // ⭐ THESE MUST BE INSIDE THE CLASS
  getSessionCount(): number {
    return this.sessions.length;
  }

  getSessionByTask(task: string) {
    return this.sessions.find(s => s.task === task);
  }

  hasLongSession(min: number): boolean {
    return this.sessions.some(s => s.duration >= min);
  }

  totalPomodoros(): number {
    return this.sessions.reduce((sum, s) => sum + s.pomodoros, 0);
  }
}
