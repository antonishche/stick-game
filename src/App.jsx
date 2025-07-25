import React, { useState, useEffect } from 'react';
import GameSettings from './components/Settings/GameSettings';
import GameBoard from './components/Board/GameBoard';
import GameStatus from './components/Status/GameStatus';
import GameMode from './components/Mode/GameMode';
import { initializeGame } from './logic/player/initializeGame';
import { makeComputerMove } from './logic/computer/computerMove';
import styles from './App.module.scss';

const App = () => {
  const [gameState, setGameState] = useState(null);
  const [mode, setMode] = useState(false)

  const handleStart = ({ objForLogic }) => {
    setGameState(initializeGame( objForLogic ));
  };

  useEffect(() => {
    if (gameState && gameState.currentPlayer === 'computer' && !gameState.winner) {
      const timeout = setTimeout(() => {
        setGameState(makeComputerMove(gameState));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [gameState]);

  if (!mode) {
    return <GameMode choseMode={setMode}/>
  }

  return (
    <div className={styles.app}>
      {!gameState ? (
        <GameSettings onStart={handleStart} choseMode={setMode} pickedMode={mode}/>
      ) : (
        <>
          <GameStatus state={gameState} mode={mode} exitGame={setGameState} rezero={setMode}/>
          <GameBoard state={gameState} onPlayerMove={setGameState}/>
          {gameState.winner && (
            <button className={styles.newGameButton} onClick={() => setGameState(null)}>
              Новая игра
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;