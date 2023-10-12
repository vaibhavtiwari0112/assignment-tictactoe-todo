import React, { useState } from 'react';
import './TodoList.css';
import { FaPlus, FaTrash } from 'react-icons/fa';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      setTodos([...todos, task]);
      setTask('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className="add-button" onClick={handleAddTodo}>
          <FaPlus /> Add
        </button>
      </div>
      <div className="todo-cards">
        {todos.map((todo, index) => (
          <div className="todo-card" key={index}>
            <span>{todo}</span>
            <button className="delete-button" onClick={() => handleDeleteTodo(index)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
