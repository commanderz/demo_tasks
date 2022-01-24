import fs from 'fs';
import { useState, useEffect, Component } from 'react'
import Link from "next/link";
import MainContainer from "../../components/MainContainer";

const Users = ({ users }) => {

    // let itemz = [];//зададим масив
    // let item2 = [];
    // for (let i = 0; i < 10; i++) {
    //     itemz.push(users[i]);
    //     item2.push(i);

    // }
    // console.log(typeof JSON.parse(users))
    const preparedUsers = users.map((user, index) => ({ ...user, index }));

    useEffect(() => {
        console.log(users)
    }, [])

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

            <a role="button" href="/users/10" class="btn btn-primary btn-lg" >Следующие 10</a>
        </MainContainer>


    );
};

export default Users;

export async function getStaticProps(context) {
    let data = fs.readFileSync('pages/data.json');
    let users = JSON.parse(data);

    return {
        props: { users: users.slice(0, 10) },
    }
}

1. ES6+
2. React + hooks(https://uk.reactjs.org/docs/getting-started.html)
3. Next.js components
4. HTML + CSS
5. 1, 3, 4, 6, 7, 10([Boominfo.ORG] React с нуля для начинающих 3 проекта в портфолио)