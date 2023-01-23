import { Formik, Form, Field } from "formik"
import { TAGS } from "./info"
import { usePosts } from "../context/appContext"
import { useNavigate } from "react-router-dom"

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
        onSubmit={ async (values, actions) => {
          const res = await createPost(values)
          if(res?.status === 200 ) {
            // setPosts([...posts, ])
            // alert('Post created')
            // navigate('/')
          } 
          if(res?.status === 500 ) alert('There is a problem with the post')
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="formik-form">
            <div className="formik-head">
              <div className="formik-head-div">
                <label htmlFor="title">Title</label>
                <Field name='title' placeholder='Title' className='formik-form-field'></Field>
              </div>
              <div className="formik-head-div-A-C">
                <div className="formik-author">
                  <label htmlFor="author">Author</label>
                  <Field name='author' placeholder='Author' className='formik-form-field-A-C' autoComplete='off'></Field>
                </div>
                <div className="formik-tag">
                  <label htmlFor="category">Tag</label>
                  <Field name='category' as="select">
                  <option value="" disabled>Select one</option>
                    {TAGS.map(tag => (
                      <option value={tag} key={tag}>{tag}</option>
                    ))}
                  </Field>
                </div>
              </div>
            </div>
            <div className="formik-head-div">
              <label htmlFor="body">Body</label>
              <Field name='body' placeholder='Body' component="textarea" className='formik-form-textarea' rows='20'></Field>
            </div>
            
            <button className="formik-btn-submit" type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}