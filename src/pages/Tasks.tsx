import React, { useState } from 'react';
import { Task, Project } from '../types';
import { TaskList } from '../components/TaskList';
import { TaskForm } from '../components/TaskForm';
import { SubtaskViewer } from '../components/SubtaskViewer';
import { Plus, ListFilter } from 'lucide-react';

interface TasksProps {
  tasks: Task[];
  projects: Project[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'subtasks'>) => void;
  onUpdateTask: (taskId: string, task: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onUpdateSubtask: (taskId: string, subtaskId: string, completed: boolean) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
}

const Tasks: React.FC<TasksProps> = ({
  tasks,
  projects,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onAddSubtask,
  onUpdateSubtask,
  onDeleteSubtask,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [subtaskTask, setSubtaskTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterProject, setFilterProject] = useState<string>('all');

  const handleEditSubmit = (updatedFields: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'subtasks'>) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, updatedFields);
      setEditingTask(null);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    if (filterProject !== 'all' && task.projectId !== filterProject) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <Plus size={18} />
            New Task
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-3 items-center">
          <ListFilter size={16} className="text-gray-400" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterProject}
            onChange={e => setFilterProject(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Projects</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <span className="text-sm text-gray-400 ml-auto">{filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}</span>
        </div>

        <TaskList
          tasks={filteredTasks}
          projects={projects}
          onEdit={task => setEditingTask(task)}
          onDelete={onDeleteTask}
          onStatusChange={(taskId, status) => onUpdateTask(taskId, { status })}
        />


      </div>

      {showForm && (
        <TaskForm
          projects={projects}
          onSubmit={task => { onAddTask(task); setShowForm(false); }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          projects={projects}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingTask(null)}
          initialTask={editingTask}
        />
      )}

      {subtaskTask && (
        <SubtaskViewer
          task={subtaskTask}
          onAddSubtask={onAddSubtask}
          onUpdateSubtask={onUpdateSubtask}
          onDeleteSubtask={onDeleteSubtask}
          onClose={() => setSubtaskTask(null)}
        />
      )}
    </div>
  );
};

export default Tasks;
