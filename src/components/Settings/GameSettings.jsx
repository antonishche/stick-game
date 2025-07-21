import React, { useState } from 'react';
import styles from './GameSettings.module.scss';

const GameSettings = ({ onStart, choseMode, pickedMode }) => {

    const [n, setN] = useState();
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [firstPlayer, setFirstPlayer] = useState('player');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const objForLogic = {
        n: n,
        min: min,
        max: max,
        firstPlayer: firstPlayer,
        mode: pickedMode
      }
      onStart({ objForLogic });
    };
  
    return (
      <form className={styles.settings} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div title='Выбрать режим' onClick={()=>choseMode(false)}><strong><b>←</b></strong></div>
          <h2>Настройки</h2>
        </div>
        <div className={styles.field}>
          <label>
            Количество палочек:
            <input
              type="number"
              onChange={(e) => setN(Number(e.target.value))}
              min="5"
              max="50"
              className={styles.input}
              required
            />
          </label>
        </div>

        {/* </> */}

        {(pickedMode === 2 || pickedMode === 4) && <div className={styles.field}>
          <label>
            Минимум палочек за ход:
            <input
              type="number"
              onChange={(e) => setMin(Number(e.target.value))}
              min="2"
              max={max}
              className={styles.input}
              required
            />
          </label>
        </div>}
        {pickedMode !== 5 && <div className={styles.field}>
          <label>
            Максимум палочек за ход:
            <input
              type="number"
              onChange={(e) => setMax(Number(e.target.value))}
              min={min}
              max={n}
              className={styles.input}
              required
            />
          </label>
        </div>}

        {/* </> */}

        <div className={styles.field}>
          <label>
            Первый ходит:
            <select
              value={firstPlayer}
              onChange={(e) => setFirstPlayer(e.target.value)}
              className={styles.select}
            >
              <option value="player">Игрок</option>
              <option value="computer">Компьютер</option>
            </select>
          </label>
        </div>
        <button type="submit" className={styles.button}>
          Начать игру
        </button>
      </form>
    );
  };
  
  export default GameSettings;