import { Component, Injectable, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// task interface
export interface Task {
  name: string;
  dueDate: Date;
  durationEstMinutes?: number; 
  category?: string;
  class?: string;
  user: string;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private firestore: Firestore = inject(Firestore);
  private itemsCollection = collection(this.firestore, 'items'); // Reference to the 'items' collection

  // ... CRUD methods below ...
}



@Component({
  selector: 'app-tab1',
  templateUrl: 'task_firestore.html',
  styleUrls: ['task_firestore.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class TaskFirestore {
  constructor() {}
}
