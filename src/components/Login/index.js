import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import ThemeContext from '../../context/ThemeContext'
import {LoginForm, LabelName, LoginPage, TextField} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    displayPassword: false,
    errorMsg: '',
    displayErrorMsg: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUsernameField = lightMode => {
    const {username} = this.state
    return (
      <div className="inputContainer">
        <LabelName textColor={lightMode} htmlFor="username">
          USERNAME
        </LabelName>
        <TextField
          textColor={lightMode}
          type="text"
          id="username"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </div>
    )
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = lightMode => {
    const {password} = this.state
    return (
      <div className="inputContainer">
        <LabelName textColor={lightMode} htmlFor="password">
          PASSWORD
        </LabelName>
        <TextField
          textColor={lightMode}
          type="password"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </div>
    )
  }

  onSuccessfulLogin = props => {
    const {history} = props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({displayErrorMsg: true, errorMsg})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 1,
      })
      console.log(data)
      const {history} = this.props
      history.replace('/')
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, displayErrorMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {lightMode, switchMode} = value
          const loginLogo = lightMode
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          return (
            <LoginPage bgColor={lightMode}>
              <LoginForm bgColor={lightMode} onSubmit={this.onSubmit}>
                <img src={loginLogo} alt="website logo" className="loginLogo" />
                {this.renderUsernameField(lightMode)}
                {this.renderPasswordField(lightMode)}
                <button type="submit" className="loginButton">
                  Login
                </button>
                {displayErrorMsg && <p className="errorMsg">*{errorMsg}</p>}
              </LoginForm>
              <button
                type="button"
                className="switchModeButton"
                onClick={switchMode}
              >
                Switch Mode
              </button>
            </LoginPage>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
