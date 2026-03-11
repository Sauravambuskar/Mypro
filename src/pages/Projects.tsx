import React from 'react';
import ProjectManager from '../components/ProjectManager';
import useTaskData from '../hooks/useTaskData';

const Projects: React.FC = () => {
  const { projects, tasks, createProject, deleteProject } = useTaskData();

  const taskCountByProject = projects.reduce<Record<string, number>>((acc, project) => {
    acc[project.id] = tasks.filter(t => t.projectId === project.id).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          <p className="text-gray-500 mt-1">Organize your tasks into projects.</p>
        </div>

        <ProjectManager
          projects={projects}
          onCreateProject={createProject}
          onDeleteProject={deleteProject}
          taskCountByProject={taskCountByProject}
        />
      </div>
    </div>
  );
};

export default Projects;
