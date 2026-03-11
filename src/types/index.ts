export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  projectId: string | null;
  subtasks: Subtask[];
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
  description: string;
  createdAt: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
}
