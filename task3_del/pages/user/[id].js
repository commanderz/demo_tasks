import { useRouter } from "next/router";
import styles from '../../styles/user.module.scss'
import MainContainer from "../../components/MainContainer";

export default function User({ users }) {
    const { query } = useRouter()
    if (query.id != "bootstrap.min.css") {
        let numb = Number.parseInt(query.id);
        let numx = 10 * Number.parseInt(numb / 10);
        console.log('ZZXC=' + query.id + ' Max2=' + numb); //query.id = /page/id
        let user = users[numb];

        return (
            <MainContainer keywords={user.name}>
                <div className={styles.user}>
                    <h0><img src={user.logo} /></h0>
                    <h1>id: {numb}</h1>
                    <h2>Авиакомпания: {user.name}</h2>
                    <h3>Страна: {user.country}</h3>
                    <h4>Лозунг: {user.slogan}</h4>
                </div >
                <a role="button" href={`/users/${numx}`} class="btn btn-warning btn-lg" >Назад</a>
            </MainContainer >

        )
    }
};

export async function getServerSideProps({ params }) {

    //if (params.id != "bootstrap.min.css") {
    //console.log('testVALUE=' + params.id + ", type=" + typeof params.id); //params.id = /page/id
    let fs = require('fs');
    let data = fs.readFileSync('pages/data.json', 'utf8');
    let users = JSON.parse(data);

    //}
    return {

        props: { users },

    }
}