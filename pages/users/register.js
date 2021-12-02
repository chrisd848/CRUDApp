import { useState } from 'react'; 
import fire from '../../config/fire-config';
import { useRouter } from 'next/router'

import Head from 'next/head';
import styles from '../../components/layout.module.css'
import utilStyles from '../../styles/utils.module.css'
import Layout, { siteTitle } from '../../components/layout'


const Register = () => {

  const router = useRouter();

  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');

  const [notify, setNotification] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (password !== passConf) {
      setNotification('Password and password confirmation does not match')

      setTimeout(() => {
        setNotification('')
      }, 2000)

      setPassword('');
      setPassConf('');
      return null;

    }

    fire.auth()
      .createUserWithEmailAndPassword(userName, password)
      .catch((err) => {
        console.log(err.code, err.message)
      });

    router.push("/")
  }

  return (
    <Layout register>
      <Head>
        <title>Register</title>
      </Head>
      <ul className={styles.topnav}>
        <li><a href="/">Home</a></li>
        <li><a href="competitions">Competitions</a></li>
        <li><a href="judges">Judges</a></li>
        <li><a href="about">About</a></li>
        <li className={styles.register}><a href="#">Register</a></li>
        <li className={styles.login}><a href="login">Login</a></li>
      </ul>

      <div className={styles.innerContainer}>
        {notify}
        <form onSubmit={handleLogin}>
          <label className={utilStyles.inputLabel} for="emal">Email</label>
          <input className={utilStyles.inputForm} id="emal" type="text" value={userName} onChange={({target}) => setUsername(target.value)} /> 
          <br />
          <label className={utilStyles.inputLabel} for="pword">Password</label> 
          <input className={utilStyles.inputForm} id="pword" type="password" value={password} onChange={({target}) => setPassword(target.value)} /> 
          <br />
          <label className={utilStyles.inputLabel} for="pwordc">Confirm Password</label>
          <input className={utilStyles.inputForm} id="pwordc" type="password" value={passConf} onChange={({target}) => setPassConf(target.value)} /> 
          <br />
          <button className={utilStyles.inputButton} type="submit">Register</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register