import {groupId, token, baseUrl} from './constants'

class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._headers = headers
    this._baseUrl = baseUrl
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(res => {
      return this._getResponseData(res)
    })
  }

  setUser({
    newName,
    newAbout
  }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    }).then(res => {
      return this._getResponseData(res)
    })
  }

  setCard({
    cardName,
    cardLink
  }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }).then(res => {
      return this._getResponseData(res)
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => {
      return this._getResponseData(res)
    })
  }

  likeCard(
    cardId
  ) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => {
      return this._getResponseData(res)
    })
  }

  dislikeCard(
    cardId
  ) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      return this._getResponseData(res)
    })
  }

  setUserAvatar(avatarSrc) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarSrc,
      })
    }).then(res => {
      return this._getResponseData(res)
    })
  }
}

const api = new Api({
  baseUrl: `${baseUrl}${groupId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
})

export default api