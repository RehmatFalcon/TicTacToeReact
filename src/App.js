import React , { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './GameBoard';

function App() {
  const getInitialGameMatrix = () => {
    return [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
  };
  const [player, setPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(0);
  const [gameMatrix , setGameMatrix] = useState(getInitialGameMatrix());
  const [gameMoves, setGameMoves] = useState([]);

  const resolveNextTurn = () => {
    return player === 1 ? 2 : 1;
  };

  const gameWon = () => {
    setWinner(player);
    setGameOver(true);
  }

  const verifyGame = (rowIndex, colIndex) => {
    const rowConquered = gameMatrix[rowIndex].every(
      x => x === player
    );
    if(rowConquered) {
      gameWon();
      return;
    }
    const colConquered = gameMatrix.every(
      row => row[colIndex] === player
    );
    if(colConquered) {
      gameWon();
      return;
    }
    if(rowIndex === colIndex) {
      const diagonal = gameMatrix.every(
        (row, idx) => gameMatrix[idx][idx] === player
      );
      if(diagonal) {
        gameWon();
        return;
      }
    }
    const allSelected = gameMatrix.every(x => {
      return x.every(y => y !== 0);
    });
    if(allSelected) {
      alert("No more moves left");
      setGameOver(true);
    }
  };

  const alreadySelected = (rowIndex, colIndex) => {
    return gameMatrix[rowIndex][colIndex] !== 0;
  }

  const addToGameMove = (rowIndex, colIndex) => {
    const newGameMoves = [
      ...gameMoves
    ];
    newGameMoves.push({
      row : rowIndex,
      col : colIndex,
      player : player
    });
    setGameMoves(newGameMoves);
  };

  const selectCell = (rowIndex, colIndex) => {
    if(gameOver) return;
    if(alreadySelected(rowIndex, colIndex)) return;
    const newGameMatrix = [...gameMatrix];
    newGameMatrix[rowIndex][colIndex] = player;
    setGameMatrix(newGameMatrix);
    addToGameMove(rowIndex, colIndex);
    verifyGame(rowIndex, colIndex);
    setPlayer(resolveNextTurn());
  };

  const restartGame = () => {
    setWinner(0);
    setGameOver(false);
    setPlayer(1);
    setGameMatrix(getInitialGameMatrix());
    setGameMoves([]);
  };

  return (
    <>
      <div id="app">
        <div id="playground">
          {!gameOver &&
              (
                <>
                <span>Player {player}'s turn</span>
                <br/>
                </>
              )
          }
          <GameBoard gameMatrix={gameMatrix} onCellSelect={selectCell} />
          {gameOver && (
              <>
              {winner !== 0 ? (
                <span>
                  Winner : Player {winner}
                </span>
              ) : (
                <span>
                  Game over ! No moves left
                </span>
              )}
              <button onClick={restartGame}>
                Play again !!
              </button>
              </>
            )
          }
        </div>
        <div id="history">
          {gameMoves.map( ({player, row, col}) => {
            return (
              <div>
                Player {player} chose Row : {row} Col : {col}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
