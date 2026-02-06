import React, { useState } from 'react';

const Todo = ({ todo, handleDeleteTodo, handleToggleComplete, setEditTodo }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="todo-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Checkbox to mark complete */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggleComplete(todo.id)}
        className="todo-checkbox"
      />

      {/* Todo title */}
      <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
        {todo.title}
      </span>

      {/* Edit and Delete buttons (shows on hover) */}
      {hovered && (
        <div className="todo-actions">
          <button
            onClick={() => setEditTodo(todo)}
            className="edit-button"
          >
            ✏️
          </button>
          <button
            onClick={() => handleDeleteTodo(todo.id)}
            className="delete-button"
          >
            ❌
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;