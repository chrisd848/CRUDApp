import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import Link from 'next/link';
import Head from 'next/head';

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'

const createCompetition = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
      .collection('competitions')
      .add({
        title: title,
        description: description,
      });

    setTitle('');
    setDescription('');

    setNotification('Competition created');
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
    <Layout createCompetition>
        <div>
            <Head>
               <title>Create Competition</title>
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
                  <p className={utilStyles.blogPara}>You must be logged in to create a competition</p>
                </div>
              ]
              :
              <form onSubmit={handleSubmit}>
                    <div>
                        <label className={utilStyles.inputLabel} for="title">Competition Title</label><br />
                        <input required className={utilStyles.inputForm} id="title" type="text" value={title} onChange={({target}) => setTitle(target.value)} />
                    </div>
                    <div>
                        <label className={utilStyles.inputLabel} for="body">Competition Description</label><br />
                        <textarea required className={utilStyles.inputArea} id="body" value={description} onChange={({target}) => setDescription(target.value)} />
                    </div>
                    <button className={utilStyles.inputButton} type="submit">Post Competition</button>
                    {notification}
                </form>
              }
                
            </div>
        </div>
    </Layout>
  )
}

export default createCompetition;