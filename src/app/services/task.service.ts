import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
/**
 * This only stores the task locally
 */
export interface TaskModel {
  name: string;
  due?: string | null;
  duration?: number | null;
  category?: string | null;
  createdAt: string; // timestamp of when created
  completed?: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSub = new BehaviorSubject<TaskModel[]>([]);

  constructor() {}

  get tasks$(): Observable<TaskModel[]> {
    return this.tasksSub.asObservable();
  }

  addTask(task: Omit<TaskModel, 'createdAt'>) {
    const newTask: TaskModel = { ...task, createdAt: new Date().toISOString(), completed: false };
    const current = this.tasksSub.getValue();
    this.tasksSub.next([newTask, ...current]);
  }

  // mark a task as completed/uncompleted by createdAt id
  setCompleted(createdAt: string, completed = true) {
    const updated = this.tasksSub.getValue().map((t) =>
      t.createdAt === createdAt ? { ...t, completed } : t
    );
    this.tasksSub.next(updated);
  }

  clear() {
    this.tasksSub.next([]);
  }
}