import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import CreatePost from '../components/CreatePost';
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
            <li><a href="/">Home</a></li>
            <li><a className={styles.active} href="#">Submissions</a></li>
            <li><a href="competitions">Competitions</a></li>
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
            <h2 className={utilStyles.headingXl}>Submissions</h2>
            <p className={utilStyles.blogPara}>Below are submissions for the "<strong>DATA HERE</strong>"" writing prompt</p>
            <ul className={utilStyles.blogList}>
              {submissions.map(submission =>
              <Link href="/submission/[id]" as={'/submission/' + submission.id }>
                <li className={utilStyles.blogItem} key={submission.id}>
                    <a itemProp="hello">{submission.title}</a>
                </li>
                </Link>
              )}
            </ul>
          
            <UploadFile />
            
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