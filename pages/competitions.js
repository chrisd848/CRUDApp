import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'

const Competitions = () => {
  const [competitions, setCompetitions] = useState([]);
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

    useEffect(() => {
      fire.firestore()
        .collection('competitions')
        .onSnapshot(snap => {
          const competitions = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setCompetitions(competitions);
        });
    }, []);

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
    <Layout competitions>
      <div>
        <Head>
          <title>Competitions</title>
        </Head>
        
        <ul className={styles.topnav}>
              <li><a href="/">Home</a></li>
              <li><a href="submissions">Submissions</a></li>
              <li><a className={styles.active} href="#">Competitions</a></li>
              <li><a href="judges">Judges</a></li>
              <li><a href="about">About</a></li>
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
            <h2 className={utilStyles.headingXl}>Competitions</h2>
            <p className={utilStyles.blogPara}>This is the competitions page</p>
            <div className={utilStyles.competitionContainer}>
              {competitions.map(competition =>
              <a href="createEntry">
              <div className={utilStyles.competitionItem} key={competition.id}>
                <div className={utilStyles.competitionContent}>
                  <p className={utilStyles.competitionTitle} itemProp="hello">{competition.title}</p>
                </div>
              </div>
              </a>
              )}
            </div>

            {loggedIn &&
            <div className={styles.backToHome}>
              <Link href="createCompetition">
                <a>Create Competition</a>
              </Link>
            </div>}

          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Competitions;