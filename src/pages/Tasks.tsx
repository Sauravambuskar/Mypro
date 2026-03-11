import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import SubtaskViewer from '../components/SubtaskViewer';
import useTaskData from '../hooks/useTaskData';
import { Task } from '../types';

const Tasks: React.FC = () => {
  const {
    tasks,
    projects,
    addTask,
    updateTask,
    deleteTask,
    addSubtask,
    updateSubtask,
    deleteSubtask,
  } = useTaskData();

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewingSubtasks, setViewingSubtasks] = useState<Task | null>(null);

  const handleToggleStatus = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const nextStatus =
      task.status === 'todo'
        ? 'inprogress'
        : task.status === 'inprogress'
        ? 'completed'
        : 'todo';
    updateTask(taskId, { status: nextStatus });
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
          <p className="text-gray-500 mt-1">Manage your tasks and stay productive.</p>
        </div>

        <TaskList
          tasks={tasks}
          projects={projects}
          onAddTask={() => { setEditingTask(null); setShowForm(true); }}
          onEditTask={handleEdit}
          onDeleteTask={deleteTask}
          onToggleStatus={handleToggleStatus}
          onViewSubtasks={setViewingSubtasks}
        />

        {showForm && (
          <TaskForm
            task={editingTask}
            projects={projects}
            onSubmit={editingTask
              ? data => updateTask(editingTask.id, data)
              : addTask
            }
            onClose={handleFormClose}
          />
        )}

        {viewingSubtasks && (
          <SubtaskViewer
            task={viewingSubtasks}
            onAddSubtask={addSubtask}
            onUpdateSubtask={updateSubtask}
            onDeleteSubtask={deleteSubtask}
            onClose={() => setViewingSubtasks(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Tasks;
