import React from 'react';
import { Task, Project } from '../types';
import { Pencil, Trash2, CheckCircle, Circle, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  projects: Project[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  onViewSubtasks: (task: Task) => void;
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  inprogress: 'bg-blue-100 text-blue-700',
  todo: 'bg-gray-100 text-gray-700',
};

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  inprogress: 'In Progress',
  todo: 'Todo',
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  projects,
  onEdit,
  onDelete,
  onToggleStatus,
  onViewSubtasks,
}) => {
  const project = projects.find(p => p.id === task.projectId);
  const completedSubtasks = task.subtasks.filter(st => st.completed).length;

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            onClick={() => onToggleStatus(task.id)}
            className="mt-0.5 text-gray-400 hover:text-green-500 flex-shrink-0"
          >
            {task.status === 'completed' ? (
              <CheckCircle size={20} className="text-green-500" />
            ) : task.status === 'inprogress' ? (
              <Clock size={20} className="text-blue-500" />
            ) : (
              <Circle size={20} />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-gray-800 truncate ${
                task.status === 'completed' ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{task.description}</p>
            )}

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[task.status]}`}>
                {statusLabels[task.status]}
              </span>
              {project && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                  style={{ backgroundColor: project.color }}
                >
                  {project.name}
                </span>
              )}
              {task.dueDate && (
                <span className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              )}
            </div>

            {task.subtasks.length > 0 && (
              <button
                onClick={() => onViewSubtasks(task)}
                className="text-xs text-blue-600 hover:text-blue-800 mt-1 underline"
              >
                {completedSubtasks}/{task.subtasks.length} subtasks
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
