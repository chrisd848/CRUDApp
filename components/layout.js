import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const homeTitle = 'HOME'
const loginTitle = 'LOGIN'
const registerTitle = 'REGISTER'
const blogTitle = 'USER SUBMISSION'
const createTitle = 'CREATE BLOG'
const competitionsTitle = 'COMPETITIONS'
const judgesTitle = 'JUDGES'
const aboutTitle = 'ABOUT'
export const siteTitle = 'site title'

export default function Layout({ children, home, login, register, blog, create, competitions, judges, about }) {
  return (
    <div className={styles.outerContainer}>

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
          {create && (
            <h1 className={utilStyles.heading2Xl}>{createTitle}</h1>
          )}
          {competitions && (
            <h1 className={utilStyles.heading2Xl}>{competitionsTitle}</h1>
          )}
          {judges && (
            <h1 className={utilStyles.heading2Xl}>{judgesTitle}</h1>
          )}
          {about && (
            <h1 className={utilStyles.heading2Xl}>{aboutTitle}</h1>
          )}
      </header>
        
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
          <div className={styles.innerContainer}>
            <div className={styles.backToHome}>
              <Link href="/">
                <a>Back to home</a>
              </Link>
            </div>
          </div>
        )}
    </div>
  )
}