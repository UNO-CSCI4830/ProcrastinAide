// Data model for tasks
export interface TaskModel {
    id?: string;
    name: string;
    due?: string | null;
    priority?: number | null;
    duration?: number | null;
    category?: string | null;
    createdAt: string; // timestamp of when created
    completed?: boolean;
    owner: string;
}