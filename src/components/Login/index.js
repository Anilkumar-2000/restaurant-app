import './index.css'

import {useState} from 'react'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const Login = props => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPasword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('/')
    setUserName('')
    setPassword('')
  }

  const onSubmitFailed = errorMsg => {
    setShowErrorMsg(true)
    setErrorMsg(errorMsg)
  }

  const formHandler = async event => {
    event.preventDefault()
    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const apiUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailed(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="Login-main-container">
      <form className="login-page form" onSubmit={formHandler}>
        <h1 className="login-title">Login Page</h1>
        <div className="label-and-input-cont">
          <label htmlFor="USERNAME">USERNAME</label>
          <div className="input-cont">
            <input
              type="text"
              placeholder="Username"
              className="user-input"
              id="USERNAME"
              onChange={event => setUserName(event.target.value)}
            />
          </div>
        </div>
        <div className="label-and-input-cont">
          <label htmlFor="PASSWORD">PASSWORD</label>
          <div className="input-cont">
            <input
              type="password"
              placeholder="Password"
              className="user-input"
              id="PASSWORD"
              onChange={event => setPassword(event.target.value)}
            />
          </div>
        </div>
        <div className="login-button-cont">
          <button type="submit" className="login-btn">
            Login
          </button>
          {showErrorMsg && <p className="error-msg-text">{errorMsg}</p>}
        </div>
      </form>
    </div>
  )
}

export default Login
