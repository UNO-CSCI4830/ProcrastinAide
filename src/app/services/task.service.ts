import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, updateDoc,
  where, getDocs, provideFirestore, getFirestore, connectFirestoreEmulator }
  from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskModel } from '../data/task.model';
import { environment } from 'src/environments/environment'
import { db } from './firebase.service'

// Define TaskService singleton to handle task management
@Injectable({ providedIn: 'root' })
export class TaskService {
  // Set up firestore inject and task collection
  //private firestore: Firestore = inject(Firestore);
  //private tasksCollection = collection(this.firestore, "tasks");
  private tasksCollection = collection(db, 'tasks');
  
  private tasksSub = new BehaviorSubject<TaskModel[]>([]);

  constructor() {}

  get tasks$(): Observable<TaskModel[]> {
    //return this.tasksSub.asObservable();
    return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<TaskModel[]>;
  }

  addTask(task: Omit<TaskModel, 'id' | 'createdAt'>) {
    // configure the task to add
    const newTask: TaskModel = { ...task, createdAt: new Date().toISOString(), completed: false };
    //const current = this.tasksSub.getValue();
    //this.tasksSub.next([newTask, ...current]);
    addDoc(this.tasksCollection, task);
  }

  /*
  // mark a task as completed/uncompleted by createdAt id
  setCompleted(createdAt: string, completed = true) {
    const updated = this.tasksSub.getValue().map((t) =>
      t.createdAt === createdAt ? { ...t, completed } : t
    );
    this.tasksSub.next(updated);
  }
  */

  // mark a task as completed/uncompleted based on id
  setCompleted(id: string, completed = true) {
    // find the right document
    //const task = doc(this.firestore, 'tasks/${id}');
    const task = doc(db, 'tasks/${id}');
    // update the completion field
    updateDoc(task, {completed: completed });
  }

  /* This is not possible in FireStore
  clear() {
    this.tasksSub.next([]);
  }
  */

  // remove a specific task
  clear(id: string) {
    // find the right document
    //const task = doc(this.firestore, 'tasks.${id}');
    const task = doc(db, 'tasks.${id}');
    // update its completion
    deleteDoc(task);
  }
}
