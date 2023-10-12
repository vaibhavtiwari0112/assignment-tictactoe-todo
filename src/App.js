import React from 'react';
import TodoList from './TodoList';
import TicTacToe from './TicTacToe';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <TodoList />
      <TicTacToe />
    </div>
  );
};

export default App;
