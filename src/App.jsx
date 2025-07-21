import React, { useState, useEffect } from 'react';
import GameSettings from './components/Settings/GameSettings';
import GameBoard from './components/Board/GameBoard';
import GameStatus from './components/Status/GameStatus';
import GameMode from './components/Mode/GameMode';
import { initializeGame, makeComputerMove } from './logic/gameLogic';
import styles from './App.module.scss';

const App = () => {
  const [gameState, setGameState] = useState(null);
  const [k, setK] = useState();
  const [mode, setMode] = useState(false);

  const handleStart = ({ objForLogic }) => {
    setGameState(initializeGame( objForLogic ));
    setK(objForLogic.max);
  };

  useEffect(() => {
    if (gameState && gameState.currentPlayer === 'computer' && !gameState.winner) {
      const timeout = setTimeout(() => {
        setGameState(makeComputerMove(gameState));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [gameState, k]);

  if (!mode) {
    return <GameMode choseMode={setMode}/>
  }

  return (
    <div className={styles.app}>
      {!gameState ? (
        <GameSettings onStart={handleStart} choseMode={setMode} pickedMode={mode}/>
      ) : (
        <>
          <GameStatus state={gameState} />
          <GameBoard state={gameState} k={k} onPlayerMove={setGameState}/>
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