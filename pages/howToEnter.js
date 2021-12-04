import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';
import Image from 'next/image'

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'

var profilePicture = "judge" + (Math.floor(Math.random() * 9) + 1) + ".jpg";

const HowToEnter = () => {
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
    <Layout HowToEnter>
      <div>
        <Head>
          <title>How To Enter</title>
        </Head>
        
        <ul className={styles.topnav}>
              <li><a href="/" key="home">Home</a></li>
              <li><a href="howToEnter" key="howToEnter" className={styles.active}>How To Enter</a></li>
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
          <h2 className={utilStyles.headingXl}>How To Enter</h2>
          <p className={utilStyles.blogPara}>Entering into a writing competition is simple! Follow the instructions below:</p>
          <ol>
            <li className={utilStyles.blogPara}>Go to the <a href="/">home</a> page via the navigation bar above</li>
            <li className={utilStyles.blogPara}>Click on one of the available competition writing prompts</li>
            <li className={utilStyles.blogPara}>You will be taken to a form where you can create a submission</li>
            <li className={utilStyles.blogPara}>Enter the title of your submission, along with the content and click "Submit Entry"</li>
          </ol>
            
            <h2 className={utilStyles.headingXl}>Judges</h2>
            <div className={utilStyles.judgeContainer}>
              {judges.map(judge =>
              <div className={utilStyles.judgeItem} key={judge.id}>
                <br/>
                <div className={utilStyles.judgeContent}>
                  <Image className={utilStyles.judgePicture} src={`/images/${profilePicture}`} alt="Picture of the judge" width={400} height={400}/>
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

export default HowToEnter;