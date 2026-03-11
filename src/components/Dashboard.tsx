import React from 'react';
import { Task, TaskStats } from '../types';
import { CheckCircle, Circle, AlertCircle, TrendingUp } from 'lucide-react';

interface DashboardProps {
  tasks: Task[];
  projects: any[];
  stats: TaskStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks, projects, stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your daily overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Tasks */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <Circle className="text-blue-500" size={32} />
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle className="text-green-500" size={32} />
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
              </div>
              <AlertCircle className="text-yellow-500" size={32} />
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Completion Rate</p>
                <p className="text-3xl font-bold text-indigo-600">{completionRate}%</p>
              </div>
              <TrendingUp className="text-indigo-500" size={32} />
            </div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tasks by Priority</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">High Priority</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${stats.total > 0 ? (stats.byPriority.high / stats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 w-8">{stats.byPriority.high}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Medium Priority</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${stats.total > 0 ? (stats.byPriority.medium / stats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 w-8">{stats.byPriority.medium}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Low Priority</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${stats.total > 0 ? (stats.byPriority.low / stats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 w-8">{stats.byPriority.low}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Overview */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Projects</h2>
            <div className="space-y-2">
              {projects.length > 0 ? (
                projects.map((project: any) => (
                  <div key={project.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.color }}
                      ></div>
                      <span className="text-gray-800">{project.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {tasks.filter((t: Task) => t.projectId === project.id).length} tasks
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No projects yet. Create one to get started!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};