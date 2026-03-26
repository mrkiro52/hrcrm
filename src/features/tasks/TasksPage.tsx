import React, { useState } from 'react';
import { Button } from '@/shared/components/Button';
import { Input } from '@/shared/components/Input';
import { useTasks } from '@/shared/context/TaskContext';
import type { Task } from '@/types/tasks';

export const TasksPage: React.FC = () => {
  const { tasks, setTasks } = useTasks();
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleAdd = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask({ title: '', description: '' });
    setIsAdding(false);
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Список задач</h1>
          <p className="text-sm text-neutral-600 mt-1">
            Активных: {activeTasks.length} | Выполнено: {completedTasks.length}
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsAdding(true)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Добавить задачу
        </Button>
      </div>

      {/* Add Task Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow-jira p-4 mb-4 border border-primary-300">
          <Input
            label="Название задачи"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Введите название"
            className="mb-3"
          />
          <Input
            label="Описание"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Добавьте описание (необязательно)"
            className="mb-3"
          />
          <div className="flex space-x-2">
            <Button variant="primary" onClick={handleAdd}>
              Сохранить
            </Button>
            <Button variant="secondary" onClick={() => setIsAdding(false)}>
              Отмена
            </Button>
          </div>
        </div>
      )}

      {/* Active Tasks */}
      <div className="space-y-2 mb-6">
        {activeTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow-sm p-4 border border-neutral-200 hover:border-primary-300 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <button
                onClick={() => handleToggleComplete(task.id)}
                className="mt-0.5 w-5 h-5 rounded-full border-2 border-neutral-400 hover:border-primary-500 transition-colors flex items-center justify-center"
              >
                {task.completed && (
                  <svg className="w-3 h-3 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-neutral-900">{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-neutral-600 mt-1">{task.description}</p>
                )}
              </div>

              <button
                onClick={() => handleDelete(task.id)}
                className="text-neutral-400 hover:text-danger-DEFAULT transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-700 mb-3">Выполненные</h2>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg shadow-sm p-4 border border-neutral-200 opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => handleToggleComplete(task.id)}
                    className="mt-0.5 w-5 h-5 rounded-full border-2 border-success-DEFAULT bg-success-DEFAULT flex items-center justify-center"
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-neutral-900 line-through">
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-neutral-600 mt-1 line-through">{task.description}</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-neutral-400 hover:text-danger-DEFAULT transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
