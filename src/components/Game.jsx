import React, { useState } from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null); 

    const handleSquareClick = (index) => {
        if (squares[index] || winner) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);
        setWinner(calculateWinner(newSquares));
    };

    const handleRestart = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    const calculateWinner = (squares) => {
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
    };

    return (
        <div className="game">
            <h1>Tres en raya</h1>
            <Board squares={squares} onSquareClick={handleSquareClick} />
            <div className="game-info">
                {winner ? `Ganador: ${winner}` : `Siguiente: ${isXNext ? 'X' : 'O'}`}
            </div><br />
            <button className="restart-btn" onClick={handleRestart}>Reiniciar juego</button>
        </div>
    );
};

export default Game;
