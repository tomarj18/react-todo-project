import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTodos, createTodo, updateTodo, deleteTodo, clearAllTodos } from './services/todoService';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import EditTodo from './components/EditTodo';
function App() {
  // State to store all todos
  const [todos, setTodos] = useState([]);
  
  // State for the input field
  const [todoInput, setTodoInput] = useState('');
  // State for editing a todo
const [editTodo, setEditTodo] = useState(null);
const [loading, setLoading] = useState(false);

// Load todos from backend on component mount
useEffect(() => {
  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };
  
  loadTodos();
}, []);

  // Function to add a new todo
const handleAddTodo = async (e) => {
  e.preventDefault();
  
  if (todoInput.trim() === '') {
    toast.error('Please enter a todo!');
    return;
  }
  
  try {
    const newTodo = await createTodo({
      title: todoInput,
      completed: false
    });
    setTodos([...todos, newTodo]);
    setTodoInput('');
    toast.success('Todo added successfully!');
  } catch (error) {
    toast.error('Failed to add todo');
  }
};

 // Function to delete a todo
const handleDeleteTodo = async (id) => {
  try {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
    toast.success('Todo deleted successfully!');
  } catch (error) {
    toast.error('Failed to delete todo');
  }
};

  // Function to toggle complete status
const handleToggleComplete = async (id) => {
  try {
    const todo = todos.find(t => t.id === id);
    const updatedTodo = await updateTodo(id, {
      ...todo,
      completed: !todo.completed
    });
    setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    toast.info('Todo status updated!');
  } catch (error) {
    toast.error('Failed to update todo');
  }
};

 // Function to clear all todos
const handleClearAll = async () => {
  if (todos.length === 0) {
    toast.warning('No todos to clear!');
    return;
  }
  
  try {
    await clearAllTodos();
    setTodos([]);
    toast.success('All todos cleared!');
  } catch (error) {
    toast.error('Failed to clear todos');
  }
};

  // Function to update a todo
const handleUpdateTodo = async (id, updatedTodo) => {
  try {
    const updated = await updateTodo(id, updatedTodo);
    setTodos(todos.map(todo => todo.id === id ? updated : todo));
    toast.success('Todo updated successfully!');
  } catch (error) {
    toast.error('Failed to update todo');
  }
};

// Function to close edit modal
const closeEdit = () => {
  setEditTodo(null);
};

  return (
    <div className="app">
      <div className="todo-container">
        <h1>My Todo App</h1>
        
        {/* Form to add new todos */}
        <TodoForm 
          todoInput={todoInput}
          setTodoInput={setTodoInput}
          handleAddTodo={handleAddTodo}
        />

       <div className="todo-list">
  {loading ? (
    <p className="empty-message">Loading todos...</p>
  ) : todos.length === 0 ? (
    <p className="empty-message">No todos yet! Add one above.</p>
  ) : (
    todos.map((todo) => (
      <Todo
        key={todo.id}
        todo={todo}
        handleDeleteTodo={handleDeleteTodo}
        handleToggleComplete={handleToggleComplete}
        setEditTodo={setEditTodo}
      />
    ))
  )}
</div>

        {/* Todo count and Clear All button */}
        <div className="todo-footer">
          <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
          {todos.length > 0 && (
            <button onClick={handleClearAll} className="clear-all-button">
              Clear All Todos
            </button>
          )}
        </div>

      </div>
       {/* Edit Modal */}
        {editTodo && (
        <EditTodo
        editTodo={editTodo}
        handleUpdateTodo={handleUpdateTodo}
        closeEdit={closeEdit}
      />
    )}
    
    <ToastContainer position="top-right" autoClose={3000} />
    </div> 
  );
}

export default App;