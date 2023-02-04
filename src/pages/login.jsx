import '../styles/login.css'
import { useState } from 'react'
import { usePosts } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

export function Login() {

  const navigate = useNavigate()

  const { login, newuser, setLoggedUser } = usePosts()

  const [isLoading, setIsLoading] = useState(false)

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [signIn, setSignIn] = useState()

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleEmpty = (e) => {
    const cls = e.target.classList[0]
    const signIn = document.getElementById('signIn')
    if (e.target.value === '' && cls === undefined) {
      e.target.classList.add('error-field')
      e.target.parentElement.classList.add('error-div')
    }
    if (e.target.value !== '') {
      if (cls === 'error-field') {
        e.target.classList.remove('error-field')
        e.target.parentElement.classList.remove('error-div')
        signIn.classList.length === 2 ? signIn.classList.remove('div-button-signIn-Error') : undefined
      }
    }
    if (signIn.classList.length === 2) signIn.classList.remove('div-button-signIn-Error')
  }

  const handleSubmit = async e => {
    setIsLoading(true)
    e.preventDefault()
    // const signInbutton = document.getElementById('signIn-button')
    //   const signUpbutton = document.getElementById('signUp-button')
    //   const forgot = document.getElementById('forgot')
    //   signInbutton.disabled = true
    //   signUpbutton.disabled = true
    //   forgot.disabled = true
    //   signInbutton.disabled = false
    //   signUpbutton.disabled = false
    //   forgot.disabled = false
    console.log(user)
    if (user.email === '' || user.password === '') {
      document.getElementById('signIn').classList.add('div-button-signIn-Error')
      return
    }
    if (!signIn) {
      console.log('Do Sign In')
      const res = await login(user)
      if (res.user?._id) {
        setLoggedUser(res.user)
        console.log(res.user)
        document.getElementById('signIn').classList.remove('div-button-signIn-Invalid')
        setIsLoading(false)
        navigate('/')
      } else {
        setIsLoading(false)
        document.getElementById('signIn').classList.add('div-button-signIn-Invalid')
      }
    }

    if (signIn) {
      console.log('Do Complete Sign Up')
      const res = await newuser(user)
      console.log(res)
    }
  }

  const handleSign = () => {
    setSignIn(!signIn)
    setUser({
      email: '',
      password: ''
    })
    const signInbutton = document.getElementById('signIn-button')
    const signUpbutton = document.getElementById('signUp-button')
    const forgot = document.getElementById('forgot')
    const pAccount = document.getElementById('pAccount')
    if (signIn) {
      signInbutton.innerText = 'SIGN IN'
      signUpbutton.innerText = 'Sign up'
      pAccount.innerText = 'Need an account?'
      forgot.classList.remove('hide')
    }
    if (!signIn) {
      signInbutton.innerText = 'COMPLETE SIGN UP'
      signUpbutton.innerText = 'Sign In'
      pAccount.innerText = 'Already have an account?'
      forgot.classList.add('hide')
    }
  }

  const handleReset = () => {
    console.log('handleReset')
  }

  // ctrl shift I

  return (
    <main className='main-sign'>
      <form className='form-sign' onSubmit={handleSubmit}>
        <div className='container-fields'>
          <div className='form-field'>
            <label htmlFor='email'>Email</label>
            <input value={user.email} name='email' type='email' placeholder='Email here' onChange={handleChange} onBlur={handleEmpty}></input>
          </div>
          <div className='form-field'>
            <label htmlFor='password'>Password</label>
            <input value={user.password} name='password' type='password' placeholder='Password here' onChange={handleChange} onBlur={handleEmpty}></input>
          </div>
        </div>
        <div id='signIn' className='div-button-signIn'>
          {/* <button id='signIn-button' type='submit' className='form-signin-button'>SIGN IN</button> */}
          <button id='signIn-button' type='submit' className='form-signin-button'>
            {isLoading ? 
              <div id='loadNew2Login' className="lds-ringNewLogin"><div></div><div></div><div></div><div></div></div>
              : 'SIGN IN'
            }
          </button>
        </div>
        <div className='div-form-info'>
          <div className='form-info-new'>
            <p id='pAccount'>Need an account?</p>
            <button id='signUp-button' type='button' onClick={handleSign}>Sign Up</button>
          </div>
          <div id='forgot' className='form-info-reset'>
            <p>Forgot your password?</p>
            <button type='button' onClick={handleReset}>Reset it</button>
          </div>
        </div>
      </form>
    </main>
  )
}