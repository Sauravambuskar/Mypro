import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Folder } from 'lucide-react';

export const Navbar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition text-sm ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold text-blue-600">TaskPro</span>
        <div className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            <LayoutDashboard size={16} />
            Dashboard
          </NavLink>
          <NavLink to="/tasks" className={linkClass}>
            <CheckSquare size={16} />
            Tasks
          </NavLink>
          <NavLink to="/projects" className={linkClass}>
            <Folder size={16} />
            Projects
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
