import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, updateDoc,
  where, getDocs, provideFirestore, getFirestore, connectFirestoreEmulator }
  from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskModel } from '../data/task.model';
import { environment } from 'src/environments/environment'
import { FirebaseService } from './firebase.service'

// Define TaskService singleton to handle task management
@Injectable({ providedIn: 'root' })
export class TaskService {
  private db: Firestore;
  private tasksCollection;
  // Set up firestore inject and task collection
  //private firestore: Firestore = inject(Firestore);
  //private tasksCollection = collection(this.firestore, "tasks");
  
  
  private tasksSub = new BehaviorSubject<TaskModel[]>([]);

  constructor(private firebaseService: FirebaseService) {
    this.db = this.firebaseService.getDbInstance();
    this.tasksCollection = collection(this.db, 'tasks');
  }

  get tasks$(): Observable<TaskModel[]> {
    //return this.tasksSub.asObservable();
    return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<TaskModel[]>;
  }

  addTask(task: Omit<TaskModel, 'id' | 'createdAt'>) {
    // configure the task to add
    const newTask: TaskModel = { ...task, createdAt: new Date().toISOString(), completed: false };
    //const current = this.tasksSub.getValue();
    //this.tasksSub.next([newTask, ...current]);
    addDoc(this.tasksCollection, newTask);
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
    const task = doc(this.db, `tasks/${id}`);
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
    const task = doc(this.db, `tasks/${id}`);
    // update its completion
    deleteDoc(task);
  }

  
  // Recommend the next task based on priority and due date.
  // Returns a TaskModel or null if none available.
  async recommendNextTask(): Promise<TaskModel | null> {
    // fetch all tasks from firestore
    const snap = await getDocs(this.tasksCollection);
    const tasks: TaskModel[] = snap.docs.map((d) => ({ ...(d.data() as any), id: d.id } as TaskModel));
    const candidates = tasks.filter((t) => !t.completed);
    if (!candidates.length) return null;

    const now = Date.now();

    const score = (t: TaskModel) => {
      const p = t.priority ?? 0;

      let dueScore = 0;
      if (t.due) {
        const dueMs = new Date(t.due).getTime();
        const days = (dueMs - now) / (1000 * 60 * 60 * 24);
        if (days <= 0) {
          dueScore = 2000; // due today or overdue
        } else {
          dueScore = 1000 / (days + 1);
        }
      }

      const priorityScore = p * 500;
      return priorityScore + dueScore;
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
