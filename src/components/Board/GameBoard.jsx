import React, { useState } from 'react';
import clsx from 'clsx';
import { validateMove, makePlayerMove } from '../../logic/gameLogic';
import styles from './GameBoard.module.scss';

const GameBoard = ({ state, k, onPlayerMove }) => {
  const [selected, setSelected] = useState([]);

  const handleStickClick = (index) => {
    if (state.sticks[index] === 0) return;
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else if (selected.length < k) {
      setSelected([...selected, index]);
    }
  };

  const handleSubmitMove = () => {
    if (!validateMove(state, selected, k)) {
      alert('Неверный ход: выберите от 1 до k палочек.');
      return;
    }
    onPlayerMove(makePlayerMove(state, selected));
    setSelected([]);
  };

  return (
    <div className={styles.board}>
      <h3 className={styles.text}>Палочки: {state.restSticks} из {state.sticks.length}</h3>
      <div className={styles.sticks}>
        {state.sticks.map((stick, index) => (
          <div
            key={index}
            className={clsx(
              styles.stick,
              stick === 1 ? styles.active : styles.inactive,
              selected.includes(index) && styles.selected
            )}
            onClick={() => handleStickClick(index)}
          >
            {stick === 1 ? '|' : ' '}
          </div>
        ))}
      </div>
      {state.currentPlayer === 'player' && !state.winner && (
        <button
          className={styles.submitButton}
          onClick={handleSubmitMove}
          disabled={selected.length === 0}
        >
          Сделать ход
        </button>
      )}
    </div>
  );
};

export default GameBoard;