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
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-task',
  templateUrl: 'new-task.page.html',
  styleUrls: ['new-task.page.scss'],
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
    IonFab,
    IonFabButton,
    IonIcon
  ],
})
export class NewTaskPage {
  // are we editing an existing task?
  isEditMode = false;
  private taskId: string | null = null;

  // local model for the form
  task: {
    name: string;
    due?: string | null;
    duration?: number | null;
    category?: string | null;
    priority?: number | null;
  } = {
    name: '',
    due: null,
    duration: null,
    category: null,
    priority: null,
  };

  categories = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'study', label: 'Study' },
    { value: 'other', label: 'Other' },
  ];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Check if there's an :id in the route -> edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        // create mode
        this.isEditMode = false;
        this.taskId = null;
        return;
      }

      // edit mode
      this.isEditMode = true;
      this.taskId = id;

      // grab the existing task once and prefill the form
      this.taskService.tasks$
        .pipe(take(1))
        .subscribe(tasks => {
          const existing = tasks.find(t => t.id === id);
          if (!existing) {
            return;
          }

          this.task = {
            name: existing.name,
            due: existing.due ?? null,
            duration: existing.duration ?? null,
            category: existing.category ?? null,
            priority: existing.priority ?? null,
          };
        });
    });
  }

  // called when user taps "Add Task" / "Save Changes"
  addTask() {
    if (!this.task.name || this.task.name.trim() === '') {
      console.warn('Task name is required');
      return;
    }

    const payload = {
      name: this.task.name.trim(),
      due: this.task.due || null,
      duration: this.task.duration || null,
      category: this.task.category || null,
      priority: this.task.priority || null,
      owner: '' // TODO: wire user later
    };

    if (this.isEditMode && this.taskId) {
      // EDIT existing task
      this.taskService.updateTask(this.taskId, payload as any);
      // immediately go back to Your Tasks
      this.router.navigate(['/task-list']);
    } else {
      // CREATE new task
      this.taskService.addTask(payload as any);
      // reset local form (not super necessary since we're leaving)
      this.task = { name: '', due: null, duration: null, category: null, priority: null };
      // go back to Your Tasks
      this.router.navigate(['/task-list']);
    }
  }

  goBack() {
    this.router.navigate(['/task-list']);
  }
}
