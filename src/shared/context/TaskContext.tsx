import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Task } from '@/types/tasks';
import { mockTasks } from '@/services/mockTasks';

interface TaskContextType {
  tasks: Task[];
  activeTaskCount: number;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const activeTaskCount = tasks.filter((t) => !t.completed).length;

  return (
    <TaskContext.Provider value={{ tasks, activeTaskCount, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};
