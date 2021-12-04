import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import Link from 'next/link';
import Head from 'next/head';

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'
import firebase, { firestore } from 'firebase';

const createEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [notification, setNotification] = useState(null);
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
      .collection('submissions')
      .add({
        title: title,
        content: content,
        timestamp: firebase.firestore.Timestamp.now(),
      });

    setTitle('');
    setContent('');

    setNotification('Submission created');
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
    <Layout createEntry>
        <div>
            <Head>
               <title>Create Entry</title>
            </Head>
            <ul className={styles.topnav}>
              <li><a href="/">Home</a></li>
              <li><a href="submissions">Submissions</a></li>
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
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={utilStyles.inputLabel} for="title">Title</label><br />
                        <input className={utilStyles.inputForm} id="title" type="text" value={title} onChange={({target}) => setTitle(target.value)} />
                    </div>
                    <div>
                        <label className={utilStyles.inputLabel} for="body">Body</label><br />
                        <textarea className={utilStyles.inputArea} id="body" value={content} onChange={({target}) => setContent(target.value)} />
                    </div>
                    <button className={utilStyles.inputButton} type="submit">Submit Entry</button>
                    {notification}
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default createEntry;