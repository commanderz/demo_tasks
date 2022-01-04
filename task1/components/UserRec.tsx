import React from 'react';
import styles from '../styles/Home.module.css'

interface IProps {
    name: string;
    surname: string;
    userDel: () => void;
    userEdit: () => void;
}

export const UserRec = ({name, surname, userDel, userEdit}: IProps) => (
    <tr className={styles.tr} >
        <td className={styles.td}>{name}</td>
        <td className={styles.td}>{surname}</td>
        <td className={styles.td}><button onClick={userDel}>Видалити</button></td>
        <td className={styles.td}><button onClick={userEdit}>Редагувати</button></td>
    </tr>
)
