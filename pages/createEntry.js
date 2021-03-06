import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import Link from 'next/link';
import Head from 'next/head';

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'
import firebase, { firestore } from 'firebase';
import { Router, useRouter } from "next/router";

const createEntry = () => {
  const { query } = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [notification, setNotification] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [competitions, setCompetitions] = useState([]);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    fire.firestore()
      .collection('submissions')
      .add({
        title: title,
        content: content,
        timestamp: new Date().toDateString(),
        prompt: prompt,
      });

    setTitle('');
    setContent('');
    setPrompt('');

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
                  <p className={utilStyles.blogPara}>You must be logged in to create a submission</p>
                </div>
              ]
              :
              <form onSubmit={handleSubmit}>
                <div>
                    <label className={utilStyles.inputLabel} for="title">Title</label><br />
                    <input required className={utilStyles.inputForm} id="title" type="text" value={title} onChange={({target}) => setTitle(target.value)} />
                </div>
                <div>
                    <label className={utilStyles.inputLabel} for="body">Body</label><br />
                    <textarea required className={utilStyles.inputArea} id="body" value={content} onChange={({target}) => setContent(target.value)} />
                </div>
                <div>
                  <label className={utilStyles.inputLabel} for="prompt">Theme</label><br />
                   <select className={utilStyles.inputForm} id="prompt" value={prompt} onChange={({target}) => setPrompt(target.value)}>
                    <option value="" selected disabled>Choose a theme...</option>
                    {competitions.map(competition =>
                    <option required value={competition.title}>{competition.title}</option>
                    )}
                  </select>
                </div>
                <button className={utilStyles.inputButton} type="submit">Submit Entry</button>
                {notification}
            </form>
              }
            </div>
        </div>
    </Layout>
  )
}

export default createEntry;