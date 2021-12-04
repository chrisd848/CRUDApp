import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import Link from 'next/link';
import Head from 'next/head';

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'

const createWinner = () => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurame] = useState('');
    const [theme, setTheme] = useState('');
    const [date, setDate] = useState('');
    const [placement, setPlacement] = useState('');
    const [notification, setNotification] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

  fire.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    })

  const handleSubmit = (event) => {
    event.preventDefault();

    fire.firestore()
      .collection('winners')
      .add({
        firstName: firstName,
        surname: surname,
        theme: theme,
        date: date,
        placement: placement,
      });

    setFirstName('');
    setSurame('');
    setTheme('');
    setDate('');
    setPlacement('');

    setNotification('Winner added successfully');
    setTimeout(() => {
      setNotification('')
    }, 5000)
    
  }

  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        setNotification('Logged out')
        setTimeout(() => {
          setNotification('')
        }, 2000)
      });
  }
  return (
    <Layout createWinner>
        <div>
            <Head>
               <title>Create Winner</title>
            </Head>
            <ul className={styles.topnav}>
              <li><a href="/" key="home">Home</a></li>
              <li><a href="howToEnter" key="howToEnter">How To Enter</a></li>
              <li><a href="faqs" key="faqs">FAQs</a></li>
              <li><a href="rules" key="rules">Rules</a></li>
              {!loggedIn 
              ?
              [
                <li className={styles.register}><a href="/users/register" key="register">Register</a></li>,
                <li className={styles.login}><a href="/users/login" key="login">Login</a></li>
              ]
              :
              <li className={styles.register}><a href="/users/login" onClick={handleLogout} key="logout">Logout</a></li>
              }
        </ul>

            <div className={styles.innerContainer}>
              
            {!loggedIn 
              ?
              [
                <div>
                  <h2 className={utilStyles.headingXl}>Login</h2>
                  <p className={utilStyles.blogPara}>You must be logged in to create a winner</p>
                </div>
              ]
              :
              <form onSubmit={handleSubmit}>
                    <div>
                        <label className={utilStyles.inputLabel} for="fname">First Name</label><br />
                        <input className={utilStyles.inputForm} id="fname" type="text" value={firstName} onChange={({target}) => setFirstName(target.value)} />
                    </div>
                    <div>
                        <label className={utilStyles.inputLabel} for="sname">Surname</label><br />
                        <input className={utilStyles.inputForm} id="sname" type="text" value={surname} onChange={({target}) => setSurame(target.value)} />
                    </div>
                    <div>
                        <label className={utilStyles.inputLabel} for="theme">Theme</label><br />
                        <input className={utilStyles.inputForm} id="theme" type="text" value={theme} onChange={({target}) => setTheme(target.value)} />
                    </div>
                    <div>
                        <label className={utilStyles.inputLabel} for="date">Date</label><br />
                        <input className={utilStyles.inputForm} id="date" type="text" value={date} onChange={({target}) => setDate(target.value)} />
                    </div>
                    <div>
                        <label className={utilStyles.inputLabel} for="placement">Placement</label><br />
                        <input className={utilStyles.inputForm} id="placement" type="text" value={placement} onChange={({target}) => setPlacement(target.value)} />
                    </div>
                    <button className={utilStyles.inputButton} type="submit">Add Winner</button>
                    {notification}
                </form>
              }
                
            </div>
        </div>
    </Layout>
  )
}

export default createWinner;