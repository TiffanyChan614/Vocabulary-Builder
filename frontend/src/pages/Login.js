import React, { useState, useEffect, useRef } from 'react'
import Button from '../components/Common/Button'
import loginService from '../services/login'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Common/Input'
import Popup from '../components/Common/Popup'
import { FaEye } from 'react-icons/fa'

const Login = () => {
  const [email, setEmail] = useState({ value: '', isValid: true })
  const [password, setPassword] = useState({ value: '', isValid: true })
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const inputTouched = useRef(false)
  const navigate = useNavigate()

  useEffect(() => {
    setEmail(email => ({
      ...email,
      isValid: validateEmail(email.value)
    }))
  }, [email.value])

  useEffect(() => {
    setPassword(password => ({
      ...password,
      isValid: validatePassword(password.value)
    }))
  }, [password.value])

  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    let errorMessage = ''
    if (!validateEmail(email.value)) {
      errorMessage += 'Email must be in the form of "username@domain.com".'
    }
    if (!validatePassword(password.value)) {
      errorMessage += 'Password cannot be empty.'
    }
    if (errorMessage) {
      showMessage(errorMessage)
      return
    }
    try {
      const user = await loginService.login({
        email: email.value,
        password: password.value
      })
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      setEmail('')
      setPassword('')
      setMessage('Login successful, user ' + user.name)
      navigate('/')
    } catch (exception) {
      showMessage('Wrong credentials')
    }
  }

  console.log(user)

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValid = re.test(String(email).toLowerCase())
    console.log('email in validate', email)
    return isValid
  }

  const validatePassword = (password) => {
    const isValid = password !== '' && password?.length > 0
    return isValid
  }

  console.log('input touched', inputTouched.current)
  console.log('email', email)
  console.log('password', password)

  return (
    <Popup title="Login" className="max-w-md">
      <div className="text-center flex flex-col gap-2 w-full">
        <h2 className="text-xl">Welcome back!</h2>
        <div className="text-rose-500">{message}</div>
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <Input type="email" value={email.value} name="email" placeholder="Email"
            onChange={(e) => {
              setEmail({ ...email, value: e.target.value })
              inputTouched.current = true
            }}
            isValid={email.isValid}/>
          <div className='flex w-full gap-2'>
            <Input type={isPasswordVisible ? 'text' : 'password' }
              value={password.value} name="password" placeholder="Password"
              className='w-full'
              onChange={(e) => {
                setPassword({ ...password, value: e.target.value })
                inputTouched.current = true
              }}
            isValid={password.isValid}/>
            <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}><FaEye /></button>
          </div>
          <Button type="submit" bgColor="indigo" size="lg">Login</Button>
        </form>
        <Link to="/" className="text-gray-500 hover:underline hover:text-indigo-700">Continue without logging in</Link>
        </div>
    </Popup>
  )
}

export default Login
