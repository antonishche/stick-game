import { React, useState, useEffect } from 'react';
import styles from './Modal.module.scss';
import modesArr from '../../json/modes.json';

export default function Modal({ state, mode }) {
    const [opened, setOpened] = useState(false);
    const [wasClicked, setWasClicked] = useState(false);

    useEffect(() => {
        if (opened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [opened]);

    return (
        <>
            <div 
                className={`${styles.btn} ${!wasClicked ? styles.pulse : ''}`} 
                title='Правила' 
                onClick={() => {
                    setOpened(!opened);
                    setWasClicked(true);
                }}
            >
                <img src="rules.png" alt="Правила игры" />
            </div>

            {opened && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Правила</h3>
                        <div className={styles.info}>
                            <div className={styles.rules}>{modesArr.modes[mode - 1].rules}</div>
                            <hr />
                            {state.min && <div>Минимум палочек — {state.min}</div>}
                            {state.max && <div>Максимум палочек — {state.max}</div>}
                            {mode !== 5 && <hr />}
                            <div className={styles.rules}>Проигрывает тот, кто не может сделать ход</div>
                        </div>
                        <div className={styles.buttons}>
                            <button onClick={() => setOpened(false)} className={styles.ok}>
                                Понятно
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}