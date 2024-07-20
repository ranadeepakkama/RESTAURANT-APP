import {Component} from 'react'
import Cookie from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errMsg: ''}

  onSuccessRes = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onFailureRes = error => {
    this.setState({errMsg: error, showSubmitError: true})
  }

  getResponse = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccessRes(data.jwt_token)
    } else {
      this.onFailureRes(data.error_msg)
    }
  }

  handleInputChange = event => {
    const {id, value} = event.target
    this.setState({[id]: value})
  }

  render() {
    const {username, password, showSubmitError, errMsg} = this.state
    const jwtToken = Cookie.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="login-cart">
          <form onSubmit={this.handleSubmit}>
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <br />
              <input
                type="text"
                id="username"
                placeholder="username"
                value={username}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={this.handleInputChange}
              />
            </div>
            <button
              type="button"
              onClick={this.getResponse}
              className="submit-button btn btn-primary"
            >
              Login
            </button>
            {showSubmitError && <p className="errorMsg">*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
