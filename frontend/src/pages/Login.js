import React, { useState } from 'react'
import Overlay from '../components/Common/Overlay'
import Button from '../components/Common/Button'
import loginService from '../services/login'
import { Link } from 'react-router-dom'
import Input from '../components/Common/Input'

const Login = () => {
  const [email, setEmail] = useState({ value: '', isValid: false })
  const [password, setPassword] = useState({ value: '', isValid: false })
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateEmail(email.value)) {
      showMessage('Email must be in the form of "username@domain.com".')
      return
    } else if (!validatePassword(password.value)) {
      showMessage('Password cannot be empty.')
      return
    }
    try {
      const user = await loginService.login({ email, password })
      setUser(user)
      setEmail('')
      setPassword('')
      setMessage('Login successful, user ' + user.name)
    } catch (exception) {
      showMessage('Wrong credentials')
    }
  }

  console.log(user)

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValid = re.test(String(email).toLowerCase())
    return isValid
  }

  const validatePassword = (password) => {
    const isValid = password !== '' && password?.length > 0
    return isValid
  }

  console.log('email', email)
  console.log('password', password)

  return (
    <Overlay>
    <div className="border w-3/4 sm:w-2/3 bg-white max-w-[500px] rounded-xl px-5 py-5 flex flex-col items-center gap-3">
      <div className="text-center flex flex-col gap-2 w-full max-w-[300px]">
        <h1 className="text-2xl font-bold">Login</h1>
        <h2 className="text-xl">Welcome back!</h2>
        <div className="text-rose-500">{message}</div>
        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
          <Input type="email" value={email.value} name="email" placeholder="Email"
            onChange={(e) => setEmail({ value: e.target.value, isValid: validateEmail(e.target.value) })}
            isValid={email.isValid}/>
          <Input type="password" value={password.value} name="password" placeholder="Password"
            onChange={(e) => setPassword({ value: e.target.value, isValid: validatePassword(e.target.value) })}
            isValid={password.isValid}/>
          <Button type="submit" bgColor="indigo" size="lg">Login</Button>
        </form>
        <Link to="/" className="text-gray-500 hover:underline">Continue without logging in</Link>
        </div>
    </div>
  </Overlay>
  )
}

export default Login
