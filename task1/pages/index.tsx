import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { UserRec } from '../components/UserRec'

interface IUser {
  id: number;
  name: string;
  surname: string;
}

interface IFormData {
  id: number | null;
  name: string;
  surname: string;
}

const STORAGE_KEY_USERS = 'UserList';
const EMPTY_FORM = { id: null, name: '', surname: '' }

const generateId = () => new Date().getTime();

const Users: NextPage = () => {
  const [formValues, setFormValues] = useState<IFormData>(EMPTY_FORM)
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const usersString = localStorage.getItem(STORAGE_KEY_USERS);
    const newUsers = usersString ? JSON.parse(usersString) : []

    setUsers(newUsers)
    console.log('READ ' + STORAGE_KEY_USERS + ' STORAGE =' + newUsers?.length);
  }, []);

  useEffect(() => {
    syncData(users);
  }, [users]);

  const syncData = (users: IUser[]) => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    console.log('SAVE to ' + STORAGE_KEY_USERS + ' STORAGE = ' + users?.length);
  }

  const handleFormChange = (field: string, value: string | number | null) => {
    console.log('fv='+formValues.id);
    setFormValues({ ...formValues, [field]: value })
  }

  const handleDeleteClick = (id: number) => {
    if (id === formValues.id) setFormValues(EMPTY_FORM);
    const newUsers = users.filter(user => user.id !== id);
    setUsers(newUsers);
  }

  const handleEditClick = (id: number) => {
    const targetUser = users.find(user => user.id === id);
    if (targetUser) {
      setFormValues(targetUser)
    }
  }

  const handleSave = () => {
    const isEdit = !!formValues.id;
    const clonedUsers = [...users];

    if (isEdit) {
      const targetUser = clonedUsers.find(user => user.id === formValues.id);
      if (targetUser) {
        targetUser.name = formValues.name;
        targetUser.surname = formValues.surname;
        setUsers(clonedUsers);
      }
    } else {
      clonedUsers.push({ id: generateId(), name: formValues.name, surname: formValues.surname })
      setUsers(clonedUsers);
    }
    setFormValues(EMPTY_FORM)
  }

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
            <p className={styles.description}><label>{"Ім'я"}</label> <br /><input value={formValues.name} onChange={e => handleFormChange('name', e.target.value)} /></p>
          </div>
          <div className={styles.card}>
            <p className={styles.description}><label>Прізвище</label><br /> <input value={formValues.surname} onChange={e => handleFormChange('surname', e.target.value)} /></p>
          </div>
          <div className={styles.card}>
            <p className={styles.description}><button disabled={!formValues.name || !formValues.surname} onClick={handleSave}>{!formValues.id ? 'Додати' : 'Зберегти'}</button> </p>
          </div>
        </div>

        {users.length > 0 ?
          <div className={styles.main2}>
            <div className={styles.grid2}>
              <table className={styles.table}>
                <thead className={styles.thead}>
                  <tr className={styles.tr}>
                    <th className={styles.th}>{`Ім'я`}</th>
                    <th className={styles.th}>Прізвище</th>
                    <th className={styles.th}>Видалити</th>
                    <th className={styles.th}>Редагувати</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody}>
                  {users.map(item =>
                    <UserRec key={item.id} name={item.name} surname={item.surname} userDel={() => handleDeleteClick(item.id)} userEdit={() => handleEditClick(item.id)}></UserRec>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          : <div className={styles.main2}>
            <h1 className={styles.description}>Інформація відсутня</h1>
          </div>
        }
      </main >

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>
            <Image src="/490-crocodile.svg" alt="Crocodile Logo" width={72} height={72} />
          </span>
        </a>
      </footer>
    </div >
  )
}


export default Users
