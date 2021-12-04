import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'

const Judges = () => {
  const [judges, setJudges] = useState([]);
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
        .collection('judges')
        .onSnapshot(snap => {
          const judges = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setJudges(judges);
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
    <Layout judges>
      <div>
        <Head>
          <title>Judges</title>
        </Head>
        
        <ul className={styles.topnav}>
              <li><a href="/" key="home">Home</a></li>
              <li><a href="submissions" key="submissions">Submissions</a></li>
              <li><a href="competitions" key="competitions">Competitions</a></li>
              <li><a className={styles.active} href="#" key="judges">Judges</a></li>
              <li><a href="about" key="about">About</a></li>
              {!loggedIn 
              ?
              [
                <li className={styles.register}><a href="/users/register" key="register">Register</a></li>,
                <li className={styles.login}><a href="/users/login" key="login">Login</a></li>
              ]
              :
              <li className={styles.register}><a href="/" onClick={handleLogout}>Logout</a></li>
              }
        </ul>

        <div className={styles.innerContainer}>
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingXl}>How To Enter</h2>
            <p className={utilStyles.blogPara}>Below are the instructions of how to enter a writing prompt</p>
            
            <h2 className={utilStyles.headingXl}>Judges</h2>
            <p className={utilStyles.blogPara}>This is the judges page</p>

            <div className={utilStyles.judgeContainer}>
              {judges.map(judge =>
              <div className={utilStyles.judgeItem} key={judge.id}>
                
                <br/>
                <div className={utilStyles.judgeContent}>
                  <p className={utilStyles.judgeFirstName} itemProp="firstName">{judge.firstName}</p>
                  <p className={utilStyles.judgeLastName} itemProp="surname">{judge.surname}</p>
                  <p className={utilStyles.judgeBiography} itemProp="biography">{judge.biography}</p>
                </div>
              </div>
              )}
            </div>

            {loggedIn &&
            <div className={styles.backToHome}>
              <Link href="createJudge">
                <a>Create Judge</a>
              </Link>
            </div>}

          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Judges;