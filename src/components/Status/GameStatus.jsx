import { React, useState, useEffect } from 'react';
import styles from './GameStatus.module.scss';
import Modal from '../Modal/Modal';

const GameStatus = ({ state, mode, exitGame, rezero }) => {
  const [opened, setOpened] = useState(false);

  function modalLogic() {
    if (!opened) {
      setOpened(!opened)
      document.body.style.overflow = 'hidden';
    } else {
      setOpened(!opened)
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <>
      {opened && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Подтверждение</h3>
            <p className={styles.message}>Вы действительно хотите выйти из игры?</p>
            <div className={styles.buttons}>
              <button onClick={() => modalLogic()} className={styles.cancel}>
                Остаться
              </button>
              <button 
                onClick={() => { 
                  modalLogic() 
                  exitGame(null); 
                  rezero(false);
                }} 
                className={styles.confirm}
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.status}>
        <div className={styles.row}>
          <div className={styles.btn} title='Выйти' onClick={() => modalLogic()}>
            <img src="exit.png" alt="Выйти" className={styles.exitIcon} />
          </div>
          {state.winner ? (
            <h2 className={state.winner === 'player' ? styles.win : styles.lose}>
              {state.winner === 'player' ? 'Победа!' : 'Поражение'}
            </h2>
          ) : (
            <h3 className={styles.turnStatus}>
              {state.currentPlayer === 'player' ? 'Ваш ход' : 'Ход компьютера'}
            </h3>
          )}
          <Modal state={state} mode={mode}/>
        </div>
      </div>
    </>
  );
};

export default GameStatus;