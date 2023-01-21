import { Formik, Form, Field } from "formik"

export function NewForm() {
  return (
    <div className="container-formik">
      <Formik
        initialValues={{
          title: '',
          author: '',
          body: '',
          category: ''
        }}
        onSubmit={(values, actions) => {
          console.log(values)
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
                  <Field name='author' placeholder='Author' className='formik-form-field-A-C'></Field>
                </div>
                <div className="formik-tag">
                  <label htmlFor="category">Tag</label>
                  <Field name='category' as="select">
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                  </Field>
                </div>
              </div>
            </div>
            <div className="formik-head-div">
              <label htmlFor="body">Body</label>
              <Field name='body' placeholder='Body' component="textarea" className='formik-form-textarea' rows='20'></Field>
            </div>
            {/* <Field placeholder='Author'></Field> */}
            <button className="formik-btn-submit" type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}