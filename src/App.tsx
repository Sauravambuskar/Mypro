import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import useTaskData from './hooks/useTaskData';

const App: React.FC = () => {
  const {
    tasks,
    projects,
    addTask,
    updateTask,
    deleteTask,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    createProject,
    deleteProject,
    calculateStatistics,
  } = useTaskData();

  const stats = calculateStatistics();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home tasks={tasks} projects={projects} stats={stats} />} />
          <Route
            path="/tasks"
            element={
              <Tasks
                tasks={tasks}
                projects={projects}
                onAddTask={addTask}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onAddSubtask={addSubtask}
                onUpdateSubtask={updateSubtask}
                onDeleteSubtask={deleteSubtask}
              />
            }
          />
          <Route
            path="/projects"
            element={
              <Projects
                projects={projects}
                tasks={tasks}
                onCreateProject={createProject}
                onDeleteProject={deleteProject}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
