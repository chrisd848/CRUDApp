import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router'

import Head from 'next/head';
import styles from '../../components/layout.module.css'
import utilStyles from '../../styles/utils.module.css'
import Layout, { siteTitle } from '../../components/layout'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    fire.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {

        console.log(err.code, err.message)
        setNotification(err.message)

        setTimeout(() => {
          setNotification('')
        }, 2000)
      })

    setUsername('')
    setPassword('')
    router.push("/")
  }

  return (
    <Layout login>
      <Head>
        <title>Login</title>
      </Head>
      <ul className={styles.topnav}>
        <li><a href="/" key="home">Home</a></li>
        <li><a href="howToEnter" key="howToEnter">How To Enter</a></li>
        <li><a href="faqs" key="faqs">FAQs</a></li>
        <li><a href="rules" key="rules">Rules</a></li>
        <li className={styles.register}><a href="register">Register</a></li>
        <li className={styles.login}><a href="#">Login</a></li>
      </ul>
        
      <div className={styles.innerContainer}>
        {notify}
        <form onSubmit={handleLogin}>
          <label className={utilStyles.inputLabel} for="emal">Email</label>
          <input className={utilStyles.inputForm} id="emal" type="text" value={username} onChange={({target}) => setUsername(target.value)} />
          <br />
          <label className={utilStyles.inputLabel} for="pword">Password</label>
          <input className={utilStyles.inputForm} id="pword" type="password" value={password} onChange={({target}) => setPassword(target.value)} />
          <br />
          <button className={utilStyles.inputButton} type="submit">Login</button>
        </form>
      </div>
    </Layout>
  )

}

export default Login
