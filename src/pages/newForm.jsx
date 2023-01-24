import { Formik, Form, Field, ErrorMessage } from "formik"
import { TAGS } from "./info"
import { usePosts } from "../context/appContext"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'

export function NewForm() {

  const { createPost, posts, setPosts } = usePosts()
  const navigate = useNavigate()

  return (
    <div className="container-formik">
      <Formik
        initialValues={{
          title: '',
          author: '',
          body: '',
          category: ''
        }}
        validationSchema={yup.object({
          title: yup.string().required('Title is required'),
          author: yup.string().required('Author is required'),
          body: yup.string().required('Body is required'),
          category: yup.string().required('Select a tag')
        })}
        onSubmit={async (values, actions) => {
          values.date = Date()
          const res = await createPost(values)
          console.log(res)
          if (res._id) {
            setPosts([...posts, res])
            alert('Post created')
            navigate('/')
          }
          if (!res._id) alert('There is a problem with the post')
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="formik-form">
            <div className="formik-wraper">
              <div className="formik-head">
                <div className="formik-head-div">
                  <label htmlFor="title">Title</label>
                  <div>
                    <Field name='title' placeholder='Title' className='formik-form-field'></Field>
                    <ErrorMessage component="div" name="title" className="formik-error" />
                  </div>
                </div>
                <div className="formik-head-div-A-C">
                  <div className="formik-author">
                    <label htmlFor="author">Author</label>
                    <div className="author-error">
                      <Field name='author' placeholder='Author' className='formik-form-field-A-C' autoComplete='off'></Field>
                      <ErrorMessage component="div" name="author" className="formik-error" />
                    </div>
                  </div>
                  <div className="formik-tag">
                    <label htmlFor="category">Tag</label>
                    <div>
                      <Field name='category' as="select">
                        <option value="" disabled>Select one</option>
                        {TAGS.map(tag => (
                          <option value={tag} key={tag}>{tag}</option>
                        ))}
                      </Field>
                      <ErrorMessage component="div" name="category" className="formik-error" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="formik-head-div-body">
                <label htmlFor="body">Body</label>
                <div className="formik-head-div-textarea">
                  <Field name='body' placeholder='Body' component="textarea" className='formik-form-textarea' rows='20'></Field>
                  <ErrorMessage component="div" name="body" className="formik-error" />
                </div>
              </div>
            </div>
            <button className="formik-btn-submit" type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}