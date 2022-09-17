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
      credentials: 'include',
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          "password": password,
          "email": email
        })
      })
      .then(res => {
        console.log(res)
        return this._checkResponse(res)
      })
  }

  signUp({
    email,
    password
  }) {
    return fetch(`${authUrl}/signup`, {
      credentials: 'include',
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
        credentials: 'include',
        method: 'GET',
      })
      .then(res => {
        console.log(res)
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