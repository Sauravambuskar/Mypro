import React, { useState } from 'react';
import { Task, Subtask } from '../types';
import { X, Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

interface SubtaskViewerProps {
  task: Task;
  onAddSubtask: (taskId: string, title: string) => void;
  onUpdateSubtask: (taskId: string, subtaskId: string, completed: boolean) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
  onClose: () => void;
}

const SubtaskViewer: React.FC<SubtaskViewerProps> = ({
  task,
  onAddSubtask,
  onUpdateSubtask,
  onDeleteSubtask,
  onClose,
}) => {
  const [newSubtask, setNewSubtask] = useState('');

  const completedCount = task.subtasks.filter((st: Subtask) => st.completed).length;
  const progress = task.subtasks.length > 0
    ? Math.round((completedCount / task.subtasks.length) * 100)
    : 0;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    onAddSubtask(task.id, newSubtask.trim());
    setNewSubtask('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Subtasks</h2>
            <p className="text-sm text-gray-500 mt-0.5 truncate">{task.title}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {task.subtasks.length > 0 && (
          <div className="px-6 pt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{completedCount}/{task.subtasks.length} completed</span>
              <span>{progress}%</span>
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
          {task.subtasks.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No subtasks yet. Add one below!</p>
          ) : (
            task.subtasks.map((subtask: Subtask) => (
              <div key={subtask.id} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
                <button
                  onClick={() => onUpdateSubtask(task.id, subtask.id, !subtask.completed)}
                  className="text-gray-400 hover:text-green-500 flex-shrink-0"
                >
                  {subtask.completed ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <Circle size={18} />
                  )}
                </button>
                <span
                  className={`flex-1 text-sm ${
                    subtask.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {subtask.title}
                </span>
                <button
                  onClick={() => onDeleteSubtask(task.id, subtask.id)}
                  className="text-gray-300 hover:text-red-500 flex-shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t">
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              type="text"
              value={newSubtask}
              onChange={e => setNewSubtask(e.target.value)}
              placeholder="Add a subtask..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
            >
              <Plus size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubtaskViewer;
