import React, { useState } from 'react';
import { Project, Task } from '../types';
import { Plus, Trash2, Folder } from 'lucide-react';

interface ProjectManagerProps {
  projects: Project[];
  tasks: Task[];
  onCreateProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  onDeleteProject: (projectId: string) => void;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  projects,
  tasks,
  onCreateProject,
  onDeleteProject,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreateProject({ name: name.trim(), description, color });
    setName('');
    setDescription('');
    setColor(COLORS[0]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Create Project</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Project name"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Project description"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <div className="flex gap-2">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition ${color === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Create Project
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(project => {
          const taskCount = tasks.filter(t => t.projectId === project.id).length;
          return (
            <div key={project.id} className="bg-white rounded-xl shadow p-5 border-t-4 hover:shadow-md transition" style={{ borderTopColor: project.color }}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${project.color}20` }}>
                    <Folder size={20} style={{ color: project.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    {project.description && (
                      <p className="text-xs text-gray-500 mt-0.5">{project.description}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onDeleteProject(project.id)}
                  className="p-1 text-gray-300 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500">
                {taskCount} task{taskCount !== 1 ? 's' : ''}
              </div>
            </div>
          );
        })}
      </div>

      {projects.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Folder size={56} className="mb-4 opacity-40" />
          <p className="text-lg font-medium">No projects yet</p>
          <p className="text-sm mt-1">Create a project to organize your tasks!</p>
        </div>
      )}
    </div>
  );
};
