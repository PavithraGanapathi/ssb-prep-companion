import { useState, useEffect } from 'react';
import type { Task } from '../types';
import { INITIAL_TASKS } from '../data/sampleTasks';
import { recordActivityDate, calculateStudyStreak } from '../utils/activityTracker';

const LOCAL_STORAGE_KEY = 'ssb_prep_tasks_v1';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    return INITIAL_TASKS;
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const willBeCompleted = !task.completed;
          if (willBeCompleted) {
            recordActivityDate();
          }
          return { ...task, completed: willBeCompleted };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const resetToDefaultTasks = () => {
    setTasks(INITIAL_TASKS);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const totalMinutes = tasks.reduce((acc, curr) => acc + (curr.estimatedMinutes || 0), 0);
  const completedMinutes = tasks.filter(t => t.completed).reduce((acc, curr) => acc + (curr.estimatedMinutes || 0), 0);

  const studyStreak = calculateStudyStreak();

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    resetToDefaultTasks,
    totalTasks,
    completedTasks,
    completionPercentage,
    totalMinutes,
    completedMinutes,
    studyStreak
  };
}
