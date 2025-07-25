import React from 'react'
import styles from './GameMode.module.scss'
import modesArr from '../../json/modes.json'

export default function GameMode({ choseMode }) {

    return (
        <div className={styles.mode}>
            <h2 className={styles.h2}>Выбор режима</h2>
            <div className={styles.blocks}>
                {modesArr.modes.map((el, id) => (
                    <div onClick={() => choseMode(el.mode)} style={{ background: el.color }} key={id} className={styles.card}>
                        <h3>{el.text}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
