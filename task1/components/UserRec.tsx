import Link from "next/link";
import React from 'react';
import styles from '../styles/Homde.module.css'

function userDel() {

}

function userEdit() {

}

function UserRec(x1: { id: string; text1: string, text2: string, href: string }) {
    return (
        <div key={x1.id} className="post">
            <div className="post__content">
                <strong>{x1.id}. {x1.text1} {x1.text2} </strong>
                <button onClick={userDel}>Видалити</button> <button onClick={userEdit}>Редагувати</button>
            </div>
        </div>

    )
}

export default UserRec;