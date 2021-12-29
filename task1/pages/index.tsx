import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import UserRec from '../components/UserRec'


const Users: NextPage = () => {

  const namez = useFormInput('');
  const surnamez = useFormInput('');
  const [userz, setUserz] = useState([
    //{key:'123', id: "1", text1: "", text2: "", href: "#" } //вилучаємо для продакшина, потрібна лише для розробки
  ]);
  const [userEditMode, setUserEditMode] = useState(-1
    //{key: id: text1 text2}
  );

  //let users: Array<{ name: string, surname: string }> = [];// { name: string, surname: string };

  function useFormInput(defVal: string) {
    const [value, setValue] = useState(defVal);
    function handleChange(e: any) {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange,
      setValue //запишемо в зовнішню змінну щоб потім викликати якщо потрібно
    };
  }


  function userDel(idz: string) {
    function filterArr(p: any, idx: any, arr: any): boolean {
      const rez: boolean = (p.id !== idz);
      if (idz > idx) { p.id = idx + 1 } else { p.id = idx }
      if ((!rez) && (userEditMode === idx + 1)) { setEdit('', '', -1); }//якщо видалили редагуємий елемент
      return rez;

    }
    //setUserz(userz.filter(p => p.id !== idz))//work ok
    setUserz(userz.filter(filterArr));
  }

  function setEdit(name: string, surname: string, id: number) {
    namez.setValue(name);
    surnamez.setValue(surname);
    setUserEditMode(id);
  }

  function userEdit(idz: string) {
    function filterArr(p: any, idx: any, arr: any): boolean {
      //const rez: boolean = (p.id !== idz);
      if (idz == idx + 1) {
        setEdit(p.text1, p.text2, p.id);
      }
      return true;
    }

    if (userEditMode >= 0) {
      //дія з попереднім редагуємим: не потрібно нічого робити, просто відміняємо
    }

    userz.filter(filterArr);
  }



  function userAdd() {
    function filterArr(p: any, idx: any, arr: any): boolean {

      //const rez: boolean = (p.id !== idz);
      //if (idz > idx) { p.id = idx + 1 } else { p.id = idx }
      if (userEditMode === idx + 1) {
        p.text1 = namez.value;
        p.text2 = surnamez.value;
      }
      return true;
    }

    if (userEditMode >= 0) {
      //дія з  редагуємим 
      setUserz(userz.filter(filterArr));
      setEdit('', '', -1);//empty edit
    } else {
      setUserz([...userz, { key: userz.length.toString() + '.' + Date.now().toString(), id: userz.length + 1, text1: namez.value, text2: surnamez.value, href: '#' }]);
      //let z = users.push({ name: namez.value, surname: surnamez.value });
      //console.log('userAdd: name=' + namez.value + ', surname=' + surnamez.value + ', len=' + z);
    }
  }



  //useEffect(() => {    console.log(users)  })

  return (
    <div className={styles.container}>
      <Head>
        <title>Users</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p className={styles.description}>{`Ім'я`} <br /><input {...namez} /></p>
          </div>
          <div className={styles.card}>
            <p className={styles.description}> {`Прізвище`}<br /> <input {...surnamez} /></p>
          </div>
          <div className={styles.card}>

            <p className={styles.description}><button onClick={userAdd}>{userEditMode == -1 ? 'Додати' : 'Зберегти'}</button> </p>
          </div>
        </div>


        <div className={styles.main2} >
          {userz.map(itemz =>
            <UserRec key={itemz.key} id={itemz.id} text1={itemz.text1} text2={itemz.text2} href='#' userDel={userDel} userEdit={userEdit}></UserRec>
          )}

        </div>
      </main >

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/490-crocodile.svg" alt="Crocodile Logo" width={72} height={72} />
          </span>
        </a>
      </footer>
    </div >
  )
}


export default Users
