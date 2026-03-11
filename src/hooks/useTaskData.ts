import { useState, useEffect } from 'react';
import { Task, Subtask, Project, TaskStats, Priority, TaskStatus } from '../types';

const DEFAULT_PROJECTS: Project[] = [
  { id: 'personal', name: 'Personal', color: '#3B82F6', description: 'Personal tasks', createdAt: new Date().toISOString() },
  { id: 'work', name: 'Work', color: '#8B5CF6', description: 'Work-related tasks', createdAt: new Date().toISOString() },
  { id: 'learning', name: 'Learning', color: '#10B981', description: 'Learning and growth', createdAt: new Date().toISOString() },
];

const useTaskData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const storedTasks: Task[] = JSON.parse(localStorage.getItem('tasks') ?? 'null') ?? [];
    const storedProjects: Project[] = JSON.parse(localStorage.getItem('projects') ?? 'null') ?? DEFAULT_PROJECTS;
    setTasks(storedTasks);
    setProjects(storedProjects);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'subtasks'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      subtasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskId: string, updatedFields: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, ...updatedFields, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const addSubtask = (taskId: string, subtaskTitle: string) => {
    const newSubtask: Subtask = {
      id: crypto.randomUUID(),
      title: subtaskTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, subtasks: [...task.subtasks, newSubtask], updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const updateSubtask = (taskId: string, subtaskId: string, completed: boolean) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map(st =>
                st.id === subtaskId ? { ...st, completed } : st
              ),
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const deleteSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter(st => st.id !== subtaskId),
              updatedAt: new Date().toISOString(),
            }
          : task
      )
    );
  };

  const createProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setTasks(prev =>
      prev.map(task =>
        task.projectId === projectId ? { ...task, projectId: null } : task
      )
    );
  };

  const getTasksByProject = (projectId: string): Task[] => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const calculateStatistics = (): TaskStats => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'inprogress').length;
    const byPriority = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length,
    };
    return { total, completed, inProgress, byPriority };
  };

  return {
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
    getTasksByProject,
    calculateStatistics,
  };
};

export type { Priority, TaskStatus };
export default useTaskData;