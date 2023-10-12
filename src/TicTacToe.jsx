import React, { useState, useEffect } from 'react';
import './TicTacToe.css';
import { FaTimes, FaCircle } from 'react-icons/fa';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  useEffect(() => {
    const storedScoreX = localStorage.getItem('scoreX');
    const storedScoreO = localStorage.getItem('scoreO');
    if (storedScoreX && storedScoreO) {
      setScoreX(parseInt(storedScoreX, 10));
      setScoreO(parseInt(storedScoreO, 10));
    }
  }, []);

  const handleClick = (index) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard) || newBoard[index]) return;
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index] === 'X' ? <FaTimes /> : board[index] === 'O' ? <FaCircle /> : null}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square !== null)
    ? 'Draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    if (winner === 'X') {
      setScoreX(scoreX + 1);
      localStorage.setItem('scoreX', scoreX + 1);
    } else if (winner === 'O') {
      setScoreO(scoreO + 1);
      localStorage.setItem('scoreO', scoreO + 1);
    }
    setTimeout(() => {
      setXIsNext(true);
      setBoard(Array(9).fill(null));
    }, 1000);
  };

  return (
    <div className="tic-tac-toe">
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
    <div className="status">{status}</div>
    {winner || board.every((square) => square !== null) ? (
      <button className="restart-button" onClick={handleRestart}>
        Play Again
      </button>
    ) : null}
    <div className="scores-table">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Player X</td>
            <td>{scoreX}</td>
          </tr>
          <tr>
            <td>Player O</td>
            <td>{scoreO}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
};


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
