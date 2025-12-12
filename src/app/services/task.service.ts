// task.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  updateDoc,
  getDocs
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TaskModel } from '../data/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksCollection;

  constructor(private firestore: Firestore) {
    this.tasksCollection = collection(this.firestore, 'tasks');
    console.log('Firestore settings:', (this.firestore as any)._settings);
  }

  /** Live stream of tasks from Firestore, with doc id mapped to `id` */
  get tasks$(): Observable<TaskModel[]> {
    return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<TaskModel[]>;
  }

  /** CREATE a new task */
  addTask(task: Omit<TaskModel, 'id' | 'createdAt'>) {
    const newTask: TaskModel = {
      ...task,
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null
    };
    return addDoc(this.tasksCollection, newTask);
  }

  /** UPDATE an existing task */
  updateTask(id: string, updates: Partial<Omit<TaskModel, 'id' | 'createdAt'>>) {
    return updateDoc(doc(this.firestore, `tasks/${id}`), updates);
  }

  /** MARK completed/not completed */
  setCompleted(id: string, completed = true) {
    const taskRef = doc(this.firestore, `tasks/${id}`);
    const updates: any = { completed };
    if (completed) updates.completedAt = new Date().toISOString();
    else updates.completedAt = null;
    return updateDoc(taskRef, updates);
  }

  /** DELETE a task */
  clear(id: string) {
    return deleteDoc(doc(this.firestore, `tasks/${id}`));
  }

  /** Recommend next task based on priority/due date */
  async recommendNextTask(): Promise<TaskModel | null> {
    const snap = await getDocs(this.tasksCollection);
    const tasks: TaskModel[] = snap.docs.map(d => ({ ...(d.data() as any), id: d.id } as TaskModel));
    const candidates = tasks.filter(t => !t.completed);
    if (candidates.length === 0) return null;

    const now = Date.now();

    const score = (t: TaskModel) => {
      const p = t.priority ?? 0;
      let dueScore = 0;
      if (t.due) {
        const dueMs = new Date(t.due).getTime();
        const days = (dueMs - now) / (1000 * 60 * 60 * 24);
        dueScore = days <= 0 ? 2000 : 1000 / (days + 1);
      }
      return p * 500 + dueScore;
    };

    let best: TaskModel | null = null;
    let bestScore = -Infinity;
    for (const t of candidates) {
      const s = score(t);
      if (s > bestScore) {
        bestScore = s;
        best = t;
      }
    }

    return best;
  }
}
