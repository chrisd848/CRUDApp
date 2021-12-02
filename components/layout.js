import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const homeTitle = 'HOME'
const loginTitle = 'LOGIN'
const registerTitle = 'REGISTER'
const blogTitle = 'USER SUBMISSION'
export const siteTitle = 'site title'

export default function Layout({ children, home, login, register, blog }) {
  return (
    <div className={styles.outerContainer}>
      <ul className={styles.topnav}>
          {home && (
            <>
              <li><a className={styles.active} href="#">Home</a></li>
              <li><a href="#">Competitions</a></li>
              <li><a href="#">Judges</a></li>
              <li><a href="#">About</a></li>
              <li className={styles.right}><a href="#">Login</a></li>
            </>
          )}
          {login && (
            <>
              <li><a href="#">Home</a></li>
              <li><a href="#">Competitions</a></li>
              <li><a href="#">Judges</a></li>
              <li><a href="#">About</a></li>
              <li className={styles.right}><a href="#">Login</a></li>
            </>
          )}
          {register && (
            <>
              <li><a href="#">Home</a></li>
              <li><a href="#">Competitions</a></li>
              <li><a href="#">Judges</a></li>
              <li><a href="#">About</a></li>
              <li className={styles.right}><a href="#">Login</a></li>
            </>
          )}
          {blog && (
            <>
              <li><a href="#">Home</a></li>
              <li><a className={styles.active} href="#">Competitions</a></li>
              <li><a href="#">Judges</a></li>
              <li><a href="#">About</a></li>
              <li className={styles.right}><a href="#">Login</a></li>
            </>
          )}
      </ul>

      <header className={styles.header}>
          {home && (
            <h1 className={utilStyles.heading2Xl}>{homeTitle}</h1>
          )}
          {login && (
            <h1 className={utilStyles.heading2Xl}>{loginTitle}</h1>
          )}
          {register && (
            <h1 className={utilStyles.heading2Xl}>{registerTitle}</h1>
          )}
          {blog && (
            <h1 className={utilStyles.heading2Xl}>{blogTitle}</h1>
          )}
      </header>
        
      <div className={styles.innerContainer}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}