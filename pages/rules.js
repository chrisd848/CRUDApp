import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'

const Rules = () => {
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
    <Layout rules>
      <div>
        <Head>
          <title>Rules</title>
        </Head>
        
        <ul className={styles.topnav}>
              <li><a href="/" key="home">Home</a></li>
              <li><a href="howToEnter" key="howToEnter">How To Enter</a></li>
              <li><a href="faqs" key="faqs">FAQs</a></li>
              <li><a href="rules" key="rules" className={styles.active}>Rules</a></li>
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
            <h2 className={utilStyles.headingXl}>Rules</h2>
            <p className={utilStyles.blogPara}>There are strict rules that must be followed in order to enter a competition.</p>
            <ol>
              <li className={utilStyles.blogPara}>Your submission must <strong>STRICTLY</strong> follow the theme of the writing competition</li>
              <ul>
                <li className={utilStyles.blogPara}><strong>Example:</strong> If the submission theme is a Christmas Short Story, the majority of the submission must pertain to Christmas</li>
              </ul>
              <li className={utilStyles.blogPara}>Your submission must meet the technical specification of the competition</li>
              <ul>
                <li className={utilStyles.blogPara}><strong>Example:</strong> If the submission theme is a Halloween Peom, you <strong>MUST</strong> submit a poem and no other form of writing</li>
              </ul>
              <li className={utilStyles.blogPara}>Your submission must be less than 1,000 words unless stated otherwise</li>
              <li className={utilStyles.blogPara}>Your submission must not contain <strong>profanity</strong></li>
              <li className={utilStyles.blogPara}>Your submission must not contain highly adult themese such as <strong>sex, drugs or violence</strong></li>
            </ol>
            <p className={utilStyles.blogPara}><strong>Failure to comply with these rules will result in your submission being withdrawn.</strong></p>
            <br />
            <h2 className={utilStyles.headingXl}>Prizes</h2>
            <p className={utilStyles.blogPara}>Below are the prizes for winning a competition</p>
            <ol>
              <li className={utilStyles.blogPara}>1 Year Subscription To Microsoft Office Home</li>
              <ul>
                <li className={utilStyles.blogPara}>Microsoft Office is one of the most widely used products for document creation, writing, powerpoints, spreadsheets and much more. By winning a competition you will be given a 1 year subscription to the service.</li>
              </ul>
              <li className={utilStyles.blogPara}>1 Year Subscription to Grammarly</li>
              <ul>
                <li className={utilStyles.blogPara}>Grammarly is a successful and critically acclaimed grammar, spelling and punctuation checking software. By coming second in a competition you will be given a 1 year subscription to the service.</li>
              </ul>
              <li className={utilStyles.blogPara}>Customised Notebook</li>
              <ul>
                <li className={utilStyles.blogPara}>Coming third place in a competition will net you a nootbook with your username on it and themed by the competition you entered.</li>
                <li className={utilStyles.blogPara}>NOTE: Participants who wins this prize will be required to provide an address for shipment</li>
              </ul>
            </ol>
            <p className={utilStyles.blogPara}><strong>Prizes are subject to change. Prizes may be withdrawn at any time for any reason.</strong></p>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Rules;