import React from 'react';
import { Task, Project } from '../types';
import { TaskCard } from './TaskCard';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  projects: Project[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, projects, onEdit, onDelete, onStatusChange }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <ClipboardList size={56} className="mb-4 opacity-40" />
        <p className="text-lg font-medium">No tasks yet</p>
        <p className="text-sm mt-1">Create a task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          project={projects.find(p => p.id === task.projectId) ?? null}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};
