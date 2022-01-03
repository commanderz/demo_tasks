import Link from "next/link";
import React from 'react';
import styles from '../styles/Home.module.css'



function UserRec(x1: { id: number; text1: string, text2: string, userDel: any, userEdit: any }) {
    return (
        <tr className={styles.tr} >
            <td className={styles.td}>{x1.id}.</td>
            <td className={styles.td}>{x1.text1}</td>
            <td className={styles.td}>{x1.text2}</td>
            <td className={styles.td}><button onClick={() => x1.userDel(x1.id)}>Видалити</button></td>
            <td className={styles.td}><button onClick={() => x1.userEdit(x1.id)}>Редагувати</button></td>


        </tr>


    )
}

export default UserRec;