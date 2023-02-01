import '../styles/login.css'
import { useState } from 'react'

export function Login() {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
    const signUpbutton = document.getElementById('signIn-button')
    if (user.email === '' || user.password === '') {
      document.getElementById('signIn').classList.add('div-button-signIn-Error')
      return
    }
    if(signUpbutton.innerText === 'SIGN IN') {
      console.log('Do Sign In')
    }

    if(signUpbutton.innerText === 'COMPLETE SIGN UP') {
      console.log('Do Complete Sign Up')
    }
  }

  const handleSign = () => {
    const signInbutton = document.getElementById('signIn-button')
    const signUpbutton = document.getElementById('signUp-button')
    const forgot = document.getElementById('forgot')
    const pAccount = document.getElementById('pAccount')
    signInbutton.innerText = 'COMPLETE SIGN UP'
    signUpbutton.innerText = 'Sign In'
    pAccount.innerText = 'Already have an account?'
    forgot.classList.add('hide')
  }

  const handleReset = () => {
    console.log('handleReset')
  }

  return (
    <main className='main-sign'>
      <form className='form-sign' onSubmit={handleSubmit}>
        <div className='container-fields'>
          <div className='form-field'>
            <label htmlFor='email'>Email</label>
            <input value={user.email} name='email' type='email' onChange={handleChange} onBlur={handleEmpty}></input>
          </div>
          <div className='form-field'>
            <label htmlFor='password'>Password</label>
            <input value={user.password} name='password' type='password' onChange={handleChange} onBlur={handleEmpty}></input>
          </div>
        </div>
        <div id='signIn' className='div-button-signIn'>
          <button id='signIn-button' type='submit' className='form-signin-button'>SIGN IN</button>
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