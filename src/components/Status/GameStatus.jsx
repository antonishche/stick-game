import React from 'react';
import styles from './GameStatus.module.scss';

const GameStatus = ({ state }) => {
  return (
    <div className={styles.status}>
      {state.winner ? (
        <h2 className={state.winner === 'player' ? styles.win : styles.lose}>{state.winner === 'player' ? 'Победа' : 'Поражение'}</h2>
      ) : (
        <h3>{state.currentPlayer === 'player' ? 'Ваш ход' : 'Ход компьютера'}</h3>
      )}
    </div>
  );
};

export default GameStatus;