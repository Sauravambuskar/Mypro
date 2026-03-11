import React from 'react';
import { Dashboard } from '../components/Dashboard';
import { Task, Project, TaskStats } from '../types';

interface HomeProps {
  tasks: Task[];
  projects: Project[];
  stats: TaskStats;
}

const Home: React.FC<HomeProps> = ({ tasks, projects, stats }) => {
  return <Dashboard tasks={tasks} projects={projects} stats={stats} />;
};

export default Home;
