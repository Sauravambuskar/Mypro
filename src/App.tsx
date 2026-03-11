import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import { LayoutDashboard, CheckSquare, FolderOpen, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/tasks', label: 'Tasks', icon: <CheckSquare size={18} /> },
    { to: '/projects', label: 'Projects', icon: <FolderOpen size={18} /> },
  ];

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar - desktop */}
        <nav className="hidden md:flex flex-col w-56 bg-gray-900 text-white p-4 gap-2 fixed inset-y-0 left-0">
          <div className="mb-6 px-2">
            <h1 className="text-xl font-bold text-white">TaskPro</h1>
            <p className="text-xs text-gray-400 mt-0.5">Task Management</p>
          </div>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-40 flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold">TaskPro</h1>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden fixed top-12 left-0 right-0 bg-gray-900 text-white z-40 p-4 space-y-1">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 md:ml-56 pt-14 md:pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
