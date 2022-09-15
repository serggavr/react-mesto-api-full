import {
  authUrl
} from './constants'

class Auth {
  constructor({
    authUrl,
    headers
  }) {
    this._headers = headers
    this._authUrl = authUrl
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject();
  }

  signIn({
    email,
    password
  }) {
    return fetch(`${authUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          "password": password,
          "email": email
        })
      })
      .then(res => {
        return this._checkResponse(res)
      })
  }

  signUp({
    email,
    password
  }) {
    return fetch(`${authUrl}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          "password": password,
          "email": email
        })
      })
      .then(res => {
        return this._checkResponse(res)
      })
  }

  AuthWithToken() {
    return fetch(`${authUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        return this._checkResponse(res)
      })
  }
}

const auth = new Auth({
  baseUrl: `${authUrl}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default auth