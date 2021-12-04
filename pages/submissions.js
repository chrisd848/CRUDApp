import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'

import UploadFile from '../components/storage/UploadFile'

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
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
      .collection('submissions')
      .onSnapshot(snap => {
        const submissions = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubmissions(submissions);
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
    <Layout submissions>
      <div>
        <Head>
          <title>Submissions</title>
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
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingXl}>Submissions</h2>
            <p className={utilStyles.blogPara}>Click on a submission title below to read it</p>
            <ul className={utilStyles.blogList}>
              {submissions.map(submission =>
              <Link href="/submission/[id]" as={'/submission/' + submission.id }>
                <li className={utilStyles.blogItem} key={submission.id}>
                    <a itemProp="hello">{submission.title}</a>
                </li>
              </Link>
              )}
            </ul>
            
            {loggedIn &&
            <div className={styles.backToHome}>
              <Link href="createEntry">
                <a>Create Submission</a>
              </Link>
            </div>}
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Submissions;