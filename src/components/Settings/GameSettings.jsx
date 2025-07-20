import React, { useState } from 'react';
import styles from './GameSettings.module.scss';

const GameSettings = ({ onStart, choseMode }) => {
    const [n, setN] = useState(5);
    const [k, setK] = useState(1);
    const [firstPlayer, setFirstPlayer] = useState('player');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (n < 5 || n > 50) {
        alert('n должно быть от 5 до 50.');
        return;
      }
      if (k < 1 || k > n) {
        alert('k должно быть от 1 до n.');
        return;
      }
      onStart({ n, k, firstPlayer });
    };
  
    return (
      <form className={styles.settings} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div onClick={()=>choseMode(false)}>←</div>
          <h2>Настройки</h2>
        </div>
        <div className={styles.field}>
          <label>
            Количество палочек (n, 5–50):
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
        <div className={styles.field}>
          <label>
            Максимум палочек за ход (k, 1–n):
            <input
              type="number"
              onChange={(e) => setK(Number(e.target.value))}
              min="1"
              max={n}
              className={styles.input}
              required
            />
          </label>
        </div>
        <div className={styles.field}>
          <label>
            Первый ход:
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