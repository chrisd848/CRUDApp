import React, { useState } from 'react';
import fire from '../config/fire-config';

import utilStyles from '../styles/utils.module.css'

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fire.firestore()
      .collection('blog')
      .add({
        title: title,
        content: content,
      });

    setTitle('');
    setContent('');

    setNotification('Blogpost created');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  return (
    <div>
      <h2>Write Blog</h2>

      {notification}

      <form onSubmit={handleSubmit}>
        <div>
          <label className={utilStyles.inputLabel} for="title">Title</label><br />
          <input className={utilStyles.inputForm} id="title" type="text" value={title} onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
        <label className={utilStyles.inputLabel} for="body">Body</label><br />
          <textarea className={utilStyles.inputArea} id="body" value={content} onChange={({target}) => setContent(target.value)} />
        </div>
        <button className={utilStyles.inputButton} type="submit">Post Blog</button>
      </form>
    </div>
  )
}

export default CreatePost;