import React, { useState } from 'react';
import clsx from 'clsx';
import { validateMove } from '../../logic/player/validateMove'
import { makePlayerMove } from '../../logic/player/playerMove'
import { isDisabled, handleStickClick } from '../../logic/stickCheck/stickCheck';
import styles from './GameBoard.module.scss';

const GameBoard = ({ state, onPlayerMove }) => {
  const [selected, setSelected] = useState([]);
  const [err, setErr] = useState(false)

  const handleSubmitMove = () => {
    if (!validateMove(state, selected)) {
      setErr('Неверный ход! Проверьте правила для выбранного режима.')
      return;
    } else {
      setErr(false);
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
            onClick={() => handleStickClick(index, state, selected, setSelected, setErr)}
          >
            {stick === 1 ? index + 1 : ' '}
          </div>
        ))}
      </div>
      {state.currentPlayer === 'player' && !state.winner && (
        <button
          className={styles.submitButton}
          onClick={handleSubmitMove}
          disabled={isDisabled(selected, state)}
        >
          Сделать ход
        </button>
      )}
      {err && <div className={styles.err}>{err}</div>}
    </div>
  );
};

export default GameBoard;