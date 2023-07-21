import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userName: '', password: '', errorMsg: ''}

  onSuccessSubmit = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 20, path: '/'})
    history.replace('/')
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()

    const {userName, password} = this.state

    const userDetails = {
      username: userName,
      password,
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({errorMsg: ''})
      this.onSuccessSubmit(data.jwt_token)
    } else if (data.status_code === 400) {
      this.setState({errorMsg: data.error_msg})
    }
  }

  updateUserName = event => {
    this.setState({userName: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {userName, password, errorMsg} = this.state

    return (
      <div className="loginBgContainer">
        <div className="loginCardContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websiteLogo"
          />
          <form className="formContainer" onSubmit={this.onSubmitUserDetails}>
            <label htmlFor="usernameInput" className="labelItem">
              USERNAME
            </label>
            <input
              type="text"
              id="usernameInput"
              className="inputBox"
              placeholder="Username"
              onChange={this.updateUserName}
              value={userName}
            />
            <label htmlFor="passwordInput" className="labelItem">
              PASSWORD
            </label>
            <input
              type="password"
              id="passwordInput"
              className="inputBox"
              placeholder="Password"
              onChange={this.updatePassword}
              value={password}
            />
            <p className="errorMsg">{errorMsg}</p>
            <button type="submit" className="loginButton">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
