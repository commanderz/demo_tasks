import Link from "next/link";
import React from 'react';
import styles from '../styles/Homde.module.css'



function UserRec(x1: { id: number; text1: string, text2: string, userDel: any, userEdit: any }) {
    return (
        <div className="post">
            <div className="post__content">
                <strong>{x1.id}. {x1.text1} {x1.text2} </strong>
                <button onClick={() => x1.userDel(x1.id)}>Видалити</button> <button onClick={() => x1.userEdit(x1.id)}>Редагувати</button>
            </div>
        </div>

    )
}

export default UserRec;