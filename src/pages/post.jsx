import { useEffect, useState } from "react"
import { usePosts } from "../context/appContext"
import { useParams } from "react-router-dom"
import { Formik, Form, Field } from "formik"
import * as yup from 'yup'
import { VscAccount } from "react-icons/vsc"
import ReactMarkdown from "react-markdown"
import '../styles/post.css'

export function Post() {

  const { id } = useParams()
  const { getPost, updatePost, posts, parseDate } = usePosts()
  const [post, setPost] = useState({
    obtained: {},
    username: ''
  })
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([])

  const fetch = async (id) => {
    setLoading(true)
    const res = await getPost(id)
    setPost({
      obtained: res.post,
      username: res.username
    })
    setComments(res.post.comments)
    setLoading(false)
  }

  useEffect(() => {
    fetch(id)
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <p>Loading post...</p>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  if(!loading){
    post.obtained.title ? document.title = post.obtained.title : document.title = 'Posts App'
    return (
      <div className="post-container">
        <div className="post-layout">
          <div className="post-layout-T-A">
            <div className="post-layout-title"
            style={{
              backgroundImage: `url(${post.obtained.image?.url})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '300px',
              width: '100%'}}
            >
              <h2>{post.obtained.title}</h2>
            </div>
            <div className="post-layout-author">
              <div className="post-layout-user">
                By: <VscAccount /> {post.username}
              </div>
              <div>
                {parseDate(post.obtained.date)}
              </div>
            </div>
          </div>
          <div className="post-layout-body">
            <ReactMarkdown>{post.obtained.body}</ReactMarkdown>
          </div>
          <div className="post-layout-tags">
            <p>{post.obtained.tags?.length !== 0 ? 'Tags: ' : 'No tags'}</p>
            <div className="post-layout-tags-fix">
              {post.obtained.tags && post.obtained.tags.map(tag => {
                return(
                  <li key={tag}>{tag}</li>
                )
              })}
            </div>
          </div>
        </div>
        <div className="post-comments">
          <p>Comments{`(${comments.length !== undefined ? comments.length : '0'})`}</p>
          {comments.map(comment => {
            return (
              <div key={comment._id || comment.body} className="post-comment">
                <div className="post-comment-username">
                  <VscAccount className="post-user" />
                  Username
                </div>
                <div className="post-comment-body">
                  {comment.body}
                </div>
              </div>
            )
          })}
          <Formik
            initialValues={{
              body: ''
            }}
            validationSchema={yup.object({
              body: yup.string()
            })}
            onSubmit={async (values, actions) => {
              const newComment = {
                comments: {
                  body: values.body,
                  date: Date()
                }
              }
              const res = await updatePost(newComment, id, true)
              if (res) {
                setComments([...comments, newComment.comments])
                posts.forEach(p => {
                  if (p._id === id) {
                    p.comments.push(newComment.comments)
                  }
                })
                actions.resetForm({
                  values: {
                    body: ''
                  }
                })
              }
              if (!res) alert('There is a problem with the comment')
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="post-comment-submit">
                  <Field name='body' as="input" placeholder='Insert new comment..' autoComplete="off"></Field>
                  <button type="submit">Send</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  }
}