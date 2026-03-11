import React from 'react';
import { Dashboard } from '../components/Dashboard';
import useTaskData from '../hooks/useTaskData';

const Home: React.FC = () => {
  const { tasks, projects, calculateStatistics } = useTaskData();
  const stats = calculateStatistics();

  return <Dashboard tasks={tasks} projects={projects} stats={stats} />;
};

export default Home;
