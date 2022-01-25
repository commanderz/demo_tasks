//import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import styles from '../../styles/user.module.scss'
import Link from "next/link";
import MainContainer from "../../components/MainContainer";
//import { exit } from 'process';

const Users = ({ users }) => {
    const { query } = useRouter();
    const preparedUsers = users.map((user, index) => ({ ...user, index }));

    return (
        <MainContainer keywords={"users next js"}>
            <h1>Cписок пользователей</h1>
            <ul>
                {preparedUsers.map(item =>
                    <li key={item.index}>
                        <Link href={`/user/${item.index}`}>
                            <a>{item.name + " - " + item.country}<img src={item.logo} /></a>

                        </Link>
                    </li>
                )}

            </ul>
            <Link href={`/users/${preparedUsers.length - 10}`}>
                <a role="button" class="btn btn-success btn-lg" >Предыдущие 10</a>
            </Link>
            <Link href={`/users/${preparedUsers.length + 10}`}>
                <a role="button" class="btn btn-danger btn-lg" >Следующие 10</a>
            </Link>

        </MainContainer >


    );
};

export default Users;


export async function getServerSideProps({ params }) {
    let fs = require('fs');
    let data = fs.readFileSync('pages/data.json');
    let users = JSON.parse(data);
    let count = Number.parseInt(params.id);

    return {
        props: { users: users.slice(0, count) },

    }
}