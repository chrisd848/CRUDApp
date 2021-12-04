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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');

  const [notify, setNotification] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (password !== passConf) {
      setNotification('Password and password confirmation does not match')

      setTimeout(() => {
        setNotification('')
      }, 5000)

      setPassword('');
      setPassConf('');
      return null;

    }

    fire.auth()
      .createUserWithEmailAndPassword(email, password)
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
        <li><a href="/" key="home">Home</a></li>
        <li><a href="howToEnter" key="howToEnter">How To Enter</a></li>
        <li><a href="faqs" key="faqs">FAQs</a></li>
        <li><a href="rules" key="rules">Rules</a></li>
        <li className={styles.register}><a href="#">Register</a></li>
        <li className={styles.login}><a href="login">Login</a></li>
      </ul>

      <div className={styles.innerContainer}>
        {notify}
        <form onSubmit={handleLogin}>
          <label className={utilStyles.inputLabel} for="username">Username</label>
          <input className={utilStyles.inputForm} id="username" type="text" value={userName} onChange={({target}) => setUsername(target.value)} /> 
          <br />
          <label className={utilStyles.inputLabel} for="emal">Email</label>
          <input className={utilStyles.inputForm} id="emal" type="email" value={email} onChange={({target}) => setEmail(target.value)} /> 
          <br />
          <label className={utilStyles.inputLabel} for="pword">Password</label> 
          <input className={utilStyles.inputForm} id="pword" type="password" value={password} onChange={({target}) => setPassword(target.value)} /> 
          <br />
          <label className={utilStyles.inputLabel} for="pwordc">Confirm Password</label>
          <input className={utilStyles.inputForm} id="pwordc" type="password" value={passConf} onChange={({target}) => setPassConf(target.value)} /> 
          <br />
          <input type="checkbox" id="terms" name="terms" required />
          <label for="terms">I acknowledge that I have read and agreed to the <a href="../termsandconditions.html">Terms and Conditions</a> and <a href="../privacypolicy.html">Privacy Policy</a></label>
          <br />
          <input type="checkbox" id="news" name="news" />
          <label for="news">Click here to sign up to recieve news and updates about writing prompts</label>
          <br />
          <button className={utilStyles.inputButton} type="submit">Register</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register