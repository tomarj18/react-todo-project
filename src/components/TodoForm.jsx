import React from 'react';

const TodoForm = ({ todoInput, setTodoInput, handleAddTodo }) => {
  return (
    <form onSubmit={handleAddTodo} className="todo-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        className="todo-input"
      />
      <button type="submit" className="add-button">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;