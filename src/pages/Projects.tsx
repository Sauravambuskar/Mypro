import React from 'react';
import { Project, Task } from '../types';
import { ProjectManager } from '../components/ProjectManager';

interface ProjectsProps {
  projects: Project[];
  tasks: Task[];
  onCreateProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  onDeleteProject: (projectId: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects, tasks, onCreateProject, onDeleteProject }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <ProjectManager
          projects={projects}
          tasks={tasks}
          onCreateProject={onCreateProject}
          onDeleteProject={onDeleteProject}
        />
      </div>
    </div>
  );
};

export default Projects;
