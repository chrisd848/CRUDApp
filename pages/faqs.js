import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import Link from 'next/link';
import Image from 'next/image'

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'

var profilePicture = "judge" + (Math.floor(Math.random() * 9) + 1) + ".jpg";

const Faqs = () => {
  const [winners, setWinners] = useState([]);
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
        .collection('winners')
        .onSnapshot(snap => {
          const winners = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setWinners(winners);
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
    <Layout faqs>
      <div>
        <Head>
          <title>FAQS</title>
        </Head>
        
        <ul className={styles.topnav}>
              <li><a href="/" key="home">Home</a></li>
              <li><a href="howToEnter" key="howToEnter">How To Enter</a></li>
              <li><a href="faqs" key="faqs" className={styles.active}>FAQs</a></li>
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
            <h2 className={utilStyles.headingXl}>FAQs</h2>
            <p className={utilStyles.blogPara}>There are strict rules that must be followed in order to enter a competition.</p>
            <ol>
              <li className={utilStyles.blogPara}>Where can I find the rules of the competition I want to enter?</li>
              <ul>
                <li className={utilStyles.blogPara}><strong>Answer:</strong> You can view the rules of all competitions on the <a href="rules">rules</a> page</li>
              </ul>
              <li className={utilStyles.blogPara}>How do I view submissions to competitions?</li>
              <ul>
                <li className={utilStyles.blogPara}><strong>Answer:</strong> Go to the <a href="/">home</a> page and click the "View Submissions" button at the bottom of the page</li>
                <li className={utilStyles.blogPara}>Alternatively you can click this link to be taken there directly: <a href="submissions">submissions</a></li>
              </ul>
              <li className={utilStyles.blogPara}>How long do I have to submit an entry to a competition?</li>
              <ul>
                <li className={utilStyles.blogPara}><strong>Answer:</strong> Some competitions persist indefinitly, if there is a time limit on a competition it will state otherwise</li>
              </ul>
              <li className={utilStyles.blogPara}>How do I enter into a competition?</li>
              <ul>
                <li className={utilStyles.blogPara}><strong>Answer:</strong> There is a list of instructions on how to enter a competition on the <a href="howToEnter">How To Enter</a> page</li>
              </ul>
              <li className={utilStyles.blogPara}>How do I create an account?</li>
              <ul>
                <li className={utilStyles.blogPara}><strong>Answer:</strong> You can create an account by clicking the <a href="howToEnter">register</a> button on the navigation menu</li>
              </ul>
              <li className={utilStyles.blogPara}>How do I win a competition?</li>
              <ul>
                <li className={utilStyles.blogPara}><strong>Answer:</strong> Competition winners will be selected by judges</li>
              </ul>
              <li className={utilStyles.blogPara}>Who are the judges?</li>
              <ul>
                <li className={utilStyles.blogPara}><strong>Answer:</strong> Information about the competition judges is available on the <a href="judges">judges</a> page</li>
              </ul>
              <li className={utilStyles.blogPara}>What are the prizes for winning a competition?</li>
              <ul>
                <li className={utilStyles.blogPara}><strong>Answer:</strong> The prizes for competitions are available on the <a href="rules">rules</a> page</li>
              </ul>
            </ol>
            <br />
            <h2 className={utilStyles.headingXl}>Winners</h2>
            <div className={utilStyles.judgeContainer}>
              {winners.map(winner =>
              <div className={utilStyles.judgeItem} key={winner.id}>
                <br/>
                <div className={utilStyles.judgeContent}>
                  <Image className={utilStyles.judgePicture} src={`/images/${profilePicture}`} alt="Picture of the winner" width={400} height={400}/>
                  <p className={utilStyles.judgeFirstName} itemProp="firstName">{winner.firstName}</p>
                  <p className={utilStyles.judgeLastName} itemProp="surname">{winner.surname}</p>
                  <p className={utilStyles.judgeBiography} itemProp="theme">{winner.theme}</p>
                  <p className={utilStyles.judgeBiography} itemProp="date">{winner.date}</p>
                  <p className={utilStyles.judgeBiography} itemProp="placement">{winner.placement} Place</p>
                </div>
              </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Faqs;