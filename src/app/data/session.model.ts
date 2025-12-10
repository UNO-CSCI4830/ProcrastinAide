// src/app/data/session.model.ts
export interface SessionModel {
  id?: string;          // Firestore document ID
  task?: string;        // task name / label
  date: any;            // Firestore Timestamp or JS Date; we’ll normalize it
  pomodoros?: number;   // number of pomodoro intervals
  duration?: number;    // minutes
}
