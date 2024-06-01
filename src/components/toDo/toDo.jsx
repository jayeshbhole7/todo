import React from 'react';
import './toDo.css';

function ToDoItem({ task, onComplete, onDelete }) {
  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked="{task.completed}" onChange={()=> onComplete(task.id)}/>
      {/* <span onClick={() => onComplete(task.id)}>{task.text}</span>*/}
      <span>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

export default ToDoItem;
