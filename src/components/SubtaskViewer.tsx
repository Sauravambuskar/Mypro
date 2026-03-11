import React, { useState } from 'react';
import { Task, Subtask } from '../types';
import { Plus, Trash2, X } from 'lucide-react';

interface SubtaskViewerProps {
  task: Task;
  onAddSubtask: (taskId: string, title: string) => void;
  onUpdateSubtask: (taskId: string, subtaskId: string, completed: boolean) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onClose: () => void;
}

export const SubtaskViewer: React.FC<SubtaskViewerProps> = ({
  task,
  onAddSubtask,
  onUpdateSubtask,
  onDeleteSubtask,
  onClose,
}) => {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    onAddSubtask(task.id, newSubtaskTitle.trim());
    setNewSubtaskTitle('');
  };

  const completedCount = task.subtasks.filter(s => s.completed).length;
  const progress = task.subtasks.length > 0 ? (completedCount / task.subtasks.length) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Subtasks</h2>
            <p className="text-sm text-gray-500 mt-0.5">{task.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={24} />
          </button>
        </div>

        {task.subtasks.length > 0 && (
          <div className="px-6 py-3 border-b">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{completedCount} of {task.subtasks.length} completed</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {task.subtasks.length === 0 && (
            <p className="text-center text-gray-400 py-8">No subtasks yet. Add one below!</p>
          )}
          {task.subtasks.map((subtask: Subtask) => (
            <div key={subtask.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg group">
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={e => onUpdateSubtask(task.id, subtask.id, e.target.checked)}
                className="w-4 h-4 accent-green-500 cursor-pointer"
              />
              <span className={`flex-1 text-sm ${subtask.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {subtask.title}
              </span>
              <button
                onClick={() => onDeleteSubtask(task.id, subtask.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-red-500 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="p-6 border-t">
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              type="text"
              value={newSubtaskTitle}
              onChange={e => setNewSubtaskTitle(e.target.value)}
              placeholder="Add a subtask..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
