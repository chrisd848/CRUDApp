import fire from '../../config/fire-config';
import Link from 'next/link'

import utilStyles from '../../styles/utils.module.css'
import Layout, { siteTitle } from '../../components/layout'

const Blog = (props) => {

  return (
    <Layout blog>
      <div>
        <h2>{props.title}</h2>
        <p>
          {props.content}
        </p>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.firestore()
    .collection('blog')
    .doc(query.id)
    .get()
    .then(result => {
      content['title'] = result.data().title;
      content['content'] = result.data().content;
    });

  return {
    props: {
      title: content.title,
      content: content.content,
    }
  }
}

export default Blog