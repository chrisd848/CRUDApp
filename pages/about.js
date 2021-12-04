import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'

const About = () => {
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
    <Layout about>
      <div>
        <Head>
          <title>About</title>
        </Head>
        
        <ul className={styles.topnav}>
              <li><a href="/">Home</a></li>
              <li><a href="submissions">Submissions</a></li>
              <li><a href="competitions">Competitions</a></li>
              <li><a href="judges">Judges</a></li>
              <li><a className={styles.active} href="#">About</a></li>
              {!loggedIn 
              ?
              [
                <li className={styles.register}><a href="/users/register">Register</a></li>,
                <li className={styles.login}><a href="/users/login">Login</a></li>
              ]
              :
              <li className={styles.register}><a href="/" onClick={handleLogout}>Logout</a></li>
              }
        </ul>

        <div className={styles.innerContainer}>
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingXl}>About</h2>
            <p className={utilStyles.blogPara}>This is the about page</p>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default About;