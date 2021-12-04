import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const homeTitle = 'HOME'
const loginTitle = 'LOGIN'
const registerTitle = 'REGISTER'
const blogTitle = 'USER SUBMISSION'
const createEntryTitle = 'CREATE ENTRY'
const createCompetitionTitle = 'CREATE COMPETITION'
const createJudgeTitle = 'CREATE JUDGE'
const createWinnerTitle = 'CREATE WINNER'
const submissionsTitle = 'SUBMISSIONS'
const competitionsTitle = 'COMPETITIONS'
const HowToEnterTitle = 'HOW TO ENTER'
const rulesTitle = 'RULES'
const faqsTitle = 'FAQS'
export const siteTitle = 'CRUD APP'

export default function Layout({ children, home, login, register, blog, createEntry, createCompetition, createJudge, createWinner, competitions, HowToEnter, faqs, rules, submissions }) {
  return (
    <>
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
          {createEntry && (
            <h1 className={utilStyles.heading2Xl}>{createEntryTitle}</h1>
          )}
          {createCompetition && (
            <h1 className={utilStyles.heading2Xl}>{createCompetitionTitle}</h1>
          )}
          {createJudge && (
            <h1 className={utilStyles.heading2Xl}>{createJudgeTitle}</h1>
          )}
          {createWinner && (
            <h1 className={utilStyles.heading2Xl}>{createWinnerTitle}</h1>
          )}
          {competitions && (
            <h1 className={utilStyles.heading2Xl}>{competitionsTitle}</h1>
          )}
          {HowToEnter && (
            <h1 className={utilStyles.heading2Xl}>{HowToEnterTitle}</h1>
          )}
          {rules && (
            <h1 className={utilStyles.heading2Xl}>{rulesTitle}</h1>
          )}
          {faqs && (
            <h1 className={utilStyles.heading2Xl}>{faqsTitle}</h1>
          )}
          {submissions && (
            <h1 className={utilStyles.heading2Xl}>{submissionsTitle}</h1>
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
    <div className={styles.footerContainer}>
      <p><a href="privacypolicy.html">Privacy Policy</a> | <a href="termsandconditions.html">Terms and Conditions</a> | <a href="cookiepolicy.html">Cookies Policy</a></p>
    </div>
    </>
    
  )
}