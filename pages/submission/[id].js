import { useState, useEffect } from 'react';
import fire from '../../config/fire-config';
import Link from 'next/link'

import Head from 'next/head';
import styles from '../../components/layout.module.css'
import utilStyles from '../../styles/utils.module.css'
import Layout, { siteTitle } from '../../components/layout'
import firebase from 'firebase';

const Submission = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [notification, setNotification] = useState('');
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
    <Layout blog>
      <Head>
          <title>User Submission</title>
      </Head>
      <ul className={styles.topnav}>
              <li><a href="../" key="home">Home</a></li>
              <li><a href="../howToEnter" key="howToEnter">How To Enter</a></li>
              <li><a href="../faqs" key="faqs">FAQs</a></li>
              <li><a href="../rules" key="rules">Rules</a></li>
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
        <h2 className={utilStyles.headingXl}>{props.title}</h2>
        <p className={utilStyles.blogDate}>{props.timestamp}</p>
        <p className={utilStyles.blogPrompt}>{props.prompt}</p>
        <p className={utilStyles.blogPara}>{props.content}</p>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.firestore()
    .collection('submissions')
    .doc(query.id)
    .get()
    .then(result => {
      content['title'] = result.data().title;
      content['content'] = result.data().content;
      content['timestamp'] = result.data().timestamp;
      content['prompt'] = result.data().prompt;
    });

  return {
    props: {
      title: content.title,
      content: content.content,
      timestamp: content.timestamp,
      prompt: content.prompt,
    }
  }
}

export default Submission