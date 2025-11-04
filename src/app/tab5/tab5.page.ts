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
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService} from '../services/task.service';
import { TaskModel } from '../data/task.model';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  imports: [CommonModule, RouterModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote, IonCheckbox, IonButton],
})
export class Tab5Page {
  tasks$: Observable<TaskModel[]>;
  todo$: Observable<TaskModel[]>;
  completed$: Observable<TaskModel[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
    this.todo$ = this.tasks$.pipe(map((list) => list.filter((t) => !t.completed)));
    this.completed$ = this.tasks$.pipe(map((list) => list.filter((t) => t.completed)));
  }

  toggleCompleted(t: TaskModel, value: boolean) {
    this.taskService.setCompleted(t.createdAt, value);
  }
}