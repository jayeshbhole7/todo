import React, { useState, useEffect } from 'react';
import TaskInput from '../taskInput/taskInput';
import ToDoItem from '../toDo/toDo';
import './to.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage();
  }, [tasks]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'incomplete':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  };

  return (
    <div className="todo-list">
      <TaskInput addTask={addTask} />
      <div className="filters">
        <label>
          <input
            type="radio"
            value="all"
            checked={filter === 'all'}
            onChange={handleFilterChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="completed"
            checked={filter === 'completed'}
            onChange={handleFilterChange}
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            value="incomplete"
            checked={filter === 'incomplete'}
            onChange={handleFilterChange}
          />
          Incomplete
        </label>
      </div>
      <div className="task-list">
        {getFilteredTasks().map(task => (
          <ToDoItem
            key={task.id}
            task={task}
            onComplete={toggleComplete}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDoList;
