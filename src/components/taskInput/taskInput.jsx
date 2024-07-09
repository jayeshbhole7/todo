import React, { useState } from 'react';
import './taskInput.css';

function TaskInput({ addTask }) {
  const [task, setTask] = useState('');
  const [error,setError]=useState('');

  const handleChange = (e) => {
    setTask(e.target.value);
    if(error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');
      setError('');
    } else {
      alert('Task cannot be empty');
      setError('Task cannot be empty');
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={handleChange}
        placeholder="Enter a new task"
        className={error?'input-error':''}
      />
      <button type="submit">Add Task</button>
      {error&& <div className="error-message">{error}</div>}
    </form>
  );
}

export default TaskInput;
