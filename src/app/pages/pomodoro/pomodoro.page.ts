import { Component, OnDestroy } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonBackButton,
  IonItem,
  IonLabel,
  IonIcon,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'pomodoro',
  standalone: true,
  templateUrl: './pomodoro.page.html',
  styleUrls: ['./pomodoro.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonBackButton,
    IonItem,
    IonLabel,
    IonIcon,
    IonSelect,
    IonSelectOption
  ],
})
export class PomodoroPage implements OnDestroy {

  selectedFocusMinutes: number = 15;   // user study duration
  breakMinutes: number = 2;            // user break duration (default)

  timeLeft: number = 0;
  timer: any = null;

  isFocusSession: boolean = true;
  isPaused: boolean = false;

  constructor(private router: Router) {}

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startFocusTimer() {
    if (this.timer) clearInterval(this.timer);

    this.isFocusSession = true;
    this.isPaused = false;
    this.timeLeft = this.selectedFocusMinutes * 60;

    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.timeLeft--;
      }

      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        alert("Break time!");
        this.startBreakTimer();
      }
    }, 1000);
  }

  pauseTimer() {
    this.isPaused = !this.isPaused;
  }

  startBreakTimer() {
    if (this.timer) clearInterval(this.timer);

    this.isFocusSession = false;
    this.isPaused = false;
    this.timeLeft = this.breakMinutes * 60;

   this.router.navigate(['/trivia-test'], {
  state: { breakTime: this.breakMinutes * 60 }
});


    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.timeLeft--;
      }

      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        alert("Break time over!");
        this.router.navigate(['/pomodoro']);
      }
    }, 1000);
  }

  get minutes(): string {
    return Math.floor(this.timeLeft / 60).toString();
  }

  get seconds(): string {
    const s = this.timeLeft % 60;
    return s < 10 ? '0' + s : s.toString();
  }
}