import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
  getDocs,
  provideFirestore,
  getFirestore,
  connectFirestoreEmulator
} from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskModel } from '../data/task.model';
import { environment } from 'src/environments/environment';
import { FirebaseService } from './firebase.service';

// Define TaskService singleton to handle task management
@Injectable({ providedIn: 'root' })
export class TaskService {
  private db: Firestore;
  private tasksCollection;

  // (still here if you ever want local BehaviorSubject again)
  private tasksSub = new BehaviorSubject<TaskModel[]>([]);

  constructor(private firebaseService: FirebaseService) {
    this.db = this.firebaseService.getDbInstance();
    this.tasksCollection = collection(this.db, 'tasks');
  }

  /** Live stream of tasks from Firestore, with doc id mapped to `id` */
  get tasks$(): Observable<TaskModel[]> {
    return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<TaskModel[]>;
  }

  /** CREATE a new task in Firestore */
  addTask(task: Omit<TaskModel, 'id' | 'createdAt'>) {
    // configure the task to add
    const newTask: TaskModel = {
      ...task,
      createdAt: new Date().toISOString(),
      completed: false,
    };

    // write to Firestore
    return addDoc(this.tasksCollection, newTask);
  }

  /** UPDATE an existing task (used for the Edit Task screen) */
  updateTask(id: string, updates: Partial<Omit<TaskModel, 'id' | 'createdAt'>>) {
    const taskRef = doc(this.db, `tasks/${id}`);
    return updateDoc(taskRef, updates);
  }

  /** Mark a task as completed / not completed, by its Firestore id */
  setCompleted(id: string, completed = true) {
    const taskRef = doc(this.db, `tasks/${id}`);
    return updateDoc(taskRef, { completed });
  }

  /** Delete a specific task by id */
  clear(id: string) {
    const taskRef = doc(this.db, `tasks/${id}`);
    return deleteDoc(taskRef);
  }
}
