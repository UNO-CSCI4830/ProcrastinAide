import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonCheckbox,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../data/task.model'
import { addIcons } from 'ionicons';
import { ellipse, flagOutline } from 'ionicons/icons';

type PriorityColor = 'danger' | 'warning' | 'success' | null;

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote, IonCheckbox, IonButton, IonIcon],
})
export class Tab5Page {
  tasks$: Observable<TaskModel[]>;
  todo$: Observable<TaskModel[]>;
  completed$: Observable<TaskModel[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
    this.todo$ = this.tasks$.pipe(map((list) => list.filter((t) => !t.completed)));
    this.completed$ = this.tasks$.pipe(map((list) => list.filter((t) => t.completed)));
    addIcons({ ellipse, flagOutline });
  }

  toggleCompleted(t: TaskModel, value: boolean) {
    this.taskService.setCompleted(t.createdAt, value);
  }

  private toMidnight(d: Date) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  private daysBetween(today: Date, due: Date): number {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((this.toMidnight(due).getTime() - this.toMidnight(today).getTime()) / msPerDay);
  }

  getPriorityColor(t: TaskModel): PriorityColor {
    if (!t.due) return null;
    const due = new Date(t.due);
    const diff = this.daysBetween(new Date(), due);

    if (diff < 0)  return 'danger';   // overdue -> red
    if (diff === 0) return 'warning'; // due today -> yellow
    if (diff >= 1) return 'success';  // 1+ days -> green
    return null;                      // tomorrow -> no flag
  }


}