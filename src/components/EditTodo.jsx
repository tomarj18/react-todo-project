import React, { useState } from 'react';

const EditTodo = ({ editTodo, handleUpdateTodo, closeEdit }) => {
  const [editText, setEditText] = useState(editTodo.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() === '') return;
    
    const updatedTodo = {
      ...editTodo,
      title: editText
    };
    
    handleUpdateTodo(editTodo.id, updatedTodo);
    closeEdit();
  };

  return (
    <div className="edit-overlay">
      <div className="edit-modal">
        <h2>Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <div className="edit-buttons">
            <button type="submit" className="save-button">
              Save
            </button>
            <button type="button" onClick={closeEdit} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;