import { useState, useEffect } from 'react';

const useTaskData = () => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
        setTasks(storedTasks);
        setProjects(storedProjects);
    }, []); // Load tasks and projects from localStorage

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [tasks, projects]); // Update localStorage when tasks or projects change

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    const updateTask = (taskId, updatedTask) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, ...updatedTask } : task));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const addSubtask = (taskId, subtask) => {
        updateTask(taskId, { subtasks: [...tasks.find(task => task.id === taskId).subtasks, subtask] });
    };

    const deleteSubtask = (taskId, subtaskId) => {
        const task = tasks.find(task => task.id === taskId);
        updateTask(taskId, { subtasks: task.subtasks.filter(subtask => subtask.id !== subtaskId) });
    };

    const createProject = (project) => {
        setProjects([...projects, project]);
    };

    const deleteProject = (projectId) => {
        setProjects(projects.filter(project => project.id !== projectId));
        setTasks(tasks.filter(task => task.projectId !== projectId)); // Remove tasks associated with the project
    };

    const calculateStatistics = () => {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        return { totalTasks, completedTasks };
    };

    return { tasks, addTask, updateTask, deleteTask, addSubtask, deleteSubtask, projects, createProject, deleteProject, calculateStatistics };
};

export default useTaskData;