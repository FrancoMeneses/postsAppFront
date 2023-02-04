import '../styles/form.css'
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import SimpleMdeReact from "react-simplemde-editor"
import "easymde/dist/easymde.min.css";
import { usePosts } from '../context/appContext';
import { Loading } from '../components/loading';

export function NewPost() {

  const navigate = useNavigate()
  const { posts, setPosts, createPost, newCreation, setNewCreation, loggedUser } = usePosts()
  if(loggedUser === null){
    navigate('/')
  }

  document.title = 'New Post'


  const [formValues, setFormValues] = useState({
    title: '',
    user: '',
    description: '',
    body: '',
    tags: [],
    image: ''
  })

  function handleImage(e) {
    setFormValues({
      ...formValues,
      image: e.target.files[0]
    })
    const img = document.getElementById('imgload')
    var url = URL.createObjectURL(e.target.files[0]);
    img.src = url;
    img.className = 'coverimage'
  }

  const [tag, setTag] = useState('')

  function handleTagsChange(e) {
    setTag(e.target.value.split(' ').join('-'))
  }

  function handleTagSubmit(e) {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault()
      setFormValues({
        ...formValues,
        tags: [...formValues.tags, tag]
      })
      setTag('')
    }
  }

  function handleDeleteTag(e) {
    const newTags = formValues.tags.filter(tag => e.target.name !== tag)
    setFormValues({
      ...formValues,
      tags: newTags
    })
  }

  const onPostBodyChange = (value) => {
    setFormValues({
      ...formValues,
      body: value
    })
  }

  function handleChange(e) {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  function handleEmpty(e) {
    const ref = document.getElementById(e.target.name)
    if (e.target.className.split(' ').length === 1 && e.target.value === "") {
      if (e.target.value === "" || typeof e.target.value !== 'string') {
        ref.classList.add("error")
        let error = document.createElement('p')
        error.innerText = "This field is required"
        error.className = "label-required-error"
        e.target.parentElement.appendChild(error)
      }
    }
    if (e.target.value !== "" && e.target.className.split(' ').length !== 1) {
      ref.classList.remove("error")
      const parent = e.target.parentElement
      parent.removeChild(e.target.parentElement.lastChild)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setFormValues({
        ...formValues,
        user: loggedUser._id
      })
      if (formValues.body !== '' && formValues.title !== '' && formValues.user !== '' && formValues.description !== '' && e.key !== "Enter") {
        setNewCreation({
          status: false,
          loading: true
        })
        formValues.date = Date()
        const res = await createPost(formValues)
        if (res._id) {
          setNewCreation({
            status: true,
            loading: true
          })
          document.getElementById('loadNew2').className = 'isnoLoading'
          document.getElementById('loadingP').innerText = 'Post Created'
          setPosts([...posts, res])
          setFormValues({
            title: '',
            author: '',
            description: '',
            body: ''
          })
        }
      } else {
        alert('Verify fields, they cannot be empty')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section id='section' className='section'>
      {newCreation.loading ? <Loading message={'Creating new post...'} path={`/`} /> : undefined}
      <form className='form-newPost' onSubmit={handleSubmit}>
        <div id='form-title' className='form-div-input'>
          <label htmlFor='title' className='label-required'>Title</label>
          <input id='title' name='title' value={formValues.title} className="form-input" autoComplete='off' placeholder='Insert your title...'
            onChange={handleChange}
            onBlur={handleEmpty}>
          </input>
        </div>
        {/* <div id="form-author" className='form-div-input'>
          <label htmlFor='author' className='label-required'>Author</label>
          <input id='author' name='author' value={formValues.user} className="form-input" autoComplete='off' placeholder='Your name' onChange={handleChange} onBlur={handleEmpty}></input>
        </div> */}
        <div id="form-description" className='form-div-input'>
          <label htmlFor='description' className='label-required'>Description</label>
          <textarea
            id='description'
            name='description'
            rows="5"
            value={formValues.description}
            className="form-textarea"
            placeholder='Insert a short description about your post'
            autoComplete='off'
            onChange={handleChange}
            onBlur={handleEmpty}></textarea>
        </div>
        <div className='form-div-input'>
          <label htmlFor='tags'>Tags</label>
          <div className='tag-div-input-button'>
            <input name='tags' className="form-input" value={tag} autoComplete='off' onKeyDown={handleTagSubmit} onChange={handleTagsChange}></input>
            <button type='button' onClick={handleTagSubmit}>Add</button>
          </div>
          <div id='form-tags-div' className='tags-map'>{formValues.tags && formValues.tags.map(tag => {
            return (
              <div key={tag} className='tag-delete-item'>
                {tag}
                <button name={tag} type='button' onClick={handleDeleteTag} className='tag-delete-item-button'>X</button>
              </div>
            )
          })}</div>
        </div>
        <div className='form-div-image'>
          <label htmlFor='image'>Cover image</label>
          <input name='image' type="file" accept="image/png, image/jpeg" onChange={handleImage}></input>
          <img id='imgload' alt='' />
        </div>
        <div id="form-body">
          <label htmlFor='body' className='label-required'>Body</label>
          <SimpleMdeReact name='body' value={formValues.body} onChange={onPostBodyChange} />
        </div>
        <button type="submit" className='form-button'>Create new post</button>
      </form>
    </section>
  )
}
