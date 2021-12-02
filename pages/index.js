import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../config/fire-config';
import CreatePost from '../components/CreatePost';
import Link from 'next/link';

import styles from '../components/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/layout'

const Home = () => {
  const [blogs, setBlogs] = useState([]);
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
      .collection('blog')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
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
    <Layout home>
      <div>
        <Head>
          <title>Home</title>
        </Head>
        
        <ul className={styles.topnav}>
              <li><a className={styles.active} href="#">Home</a></li>
              <li><a href="#">Competitions</a></li>
              <li><a href="#">Judges</a></li>
              <li><a href="#">About</a></li>
              {!loggedIn 
              ?
              [
                <li className={styles.register}><a href="/users/register">Register</a></li>,
                <li className={styles.login}><a href="/users/login">Login</a></li>
              ]
              :
              <li className={styles.register}><a href="/" onClick={handleLogout}>Logout</a></li>
              }
        </ul>

        <div className={styles.innerContainer}>
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Blogs</h2>
            <ul className={utilStyles.list}>
              {blogs.map(blog =>
                <li className={utilStyles.listItem} key={blog.id}>
                  <Link href="/blog/[id]" as={'/blog/' + blog.id }>
                    <a itemProp="hello">{blog.title}</a>
                  </Link>
                </li>
              )}
            </ul>
          
            {loggedIn &&
            <div className={styles.backToHome}>
              <Link href="create">
                <a>Create Blog Post</a>
              </Link>
            </div>}
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default Home;