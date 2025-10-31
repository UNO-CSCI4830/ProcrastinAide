import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  imports: [
    CommonModule,
    JsonPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    IonButton,
    FormsModule,
  ],
})

export class Tab4Page {
  // local model for the form
  task: {
    name: string;
    due?: string | null;
    duration?: number | null;
    category?: string | null;
  } = {
    name: '',
    due: null,
    duration: null,
    category: null,
  };

  categories = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'study', label: 'Study' },
    { value: 'other', label: 'Other' },
  ];

  constructor() {}

  // called when user taps "Add Task" — currently local-only (console + reset)
  addTask() {
    if (!this.task.name || this.task.name.trim() === '') {
      // simple client-side validation — keep minimal to avoid introducing AlertController
      console.warn('Task name is required');
      return;
    }

    // Prepare a copy of task to send to backend later
    const payload = {
      name: this.task.name.trim(),
      due: this.task.due || null,
      duration: this.task.duration || null,
      category: this.task.category || null,
    };

    // For now just log it — backend wiring will happen later
    // You can replace this with an HTTP call or service when ready
    // eslint-disable-next-line no-console
    console.log('Add Task (payload):', payload);

    // reset form
    this.task = { name: '', due: null, duration: null, category: null };
  }
}