import React, { useState } from 'react';
import { Task, Project } from '../types';
import { Edit2, Trash2, ChevronDown, ChevronUp, Calendar, Tag } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  project: Project | null;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

const PRIORITY_COLORS: Record<Task['priority'], string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};

const STATUS_COLORS: Record<Task['status'], string> = {
  todo: 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
};

const STATUS_LABELS: Record<Task['status'], string> = {
  todo: 'Todo',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, project, onEdit, onDelete, onStatusChange }) => {
  const [expanded, setExpanded] = useState(false);

  const completedSubtasks = task.subtasks.filter(s => s.completed).length;

  return (
    <div className={`bg-white rounded-lg shadow border-l-4 ${task.priority === 'high' ? 'border-red-400' : task.priority === 'medium' ? 'border-yellow-400' : 'border-green-400'} p-4 hover:shadow-md transition`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[task.status]}`}>
              {STATUS_LABELS[task.status]}
            </span>
            {project && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: project.color }}></span>
                {project.name}
              </span>
            )}
          </div>

          <h3 className={`font-semibold text-gray-800 ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>

          {task.description && (
            <p className="text-sm text-gray-500 mt-1 truncate">{task.description}</p>
          )}

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            {task.dueDate && (
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            {task.subtasks.length > 0 && (
              <span className="flex items-center gap-1">
                <Tag size={12} />
                {completedSubtasks}/{task.subtasks.length} subtasks
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <select
            value={task.status}
            onChange={e => onStatusChange(task.id, e.target.value as Task['status'])}
            className="text-xs border border-gray-200 rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
            onClick={e => e.stopPropagation()}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
          >
            <Trash2 size={15} />
          </button>
          {task.subtasks.length > 0 && (
            <button
              onClick={() => setExpanded(prev => !prev)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded transition"
            >
              {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          )}
        </div>
      </div>

      {expanded && task.subtasks.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
          {task.subtasks.map(subtask => (
            <div key={subtask.id} className="flex items-center gap-2 text-sm text-gray-600">
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${subtask.completed ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                {subtask.completed && <span className="text-white text-xs">✓</span>}
              </span>
              <span className={subtask.completed ? 'line-through text-gray-400' : ''}>{subtask.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
