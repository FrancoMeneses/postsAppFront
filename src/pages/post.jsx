import { useEffect, useState } from "react"
import { usePosts } from "../context/appContext"
import { useParams } from "react-router-dom"
import { Formik, Form, Field } from "formik"
import * as yup from 'yup'

export function Post() {

  const { id } = useParams()
  const { getPost, updatePost } = usePosts()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([])

  const fetch = async (id) => {
    const res = await getPost(id)
    setPost(res)
    setComments(res.comments)
  }

  useEffect(() => {
    fetch(id)
  }, [])

  if (post.length === 0) {
    return (
      <div>Loading post...</div>
    )
  }

  return (
    <div className="post-container">
      <h2>{post.title}</h2>
      <div>{post.body}</div>
      <div>{post.author}</div>
      <div>{post.category}</div>
      <div>
        <p>Comments</p>
        {comments.map(comment => {
          return (
            <div key={comment.body}>{comment.body}</div>
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
            }
            if (!res) alert('There is a problem with the comment')
          }}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="formik-form">
              <div>
                <Field name='body' placeholder='Insert comment..'></Field>
                <button type="submit">Enviar</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}