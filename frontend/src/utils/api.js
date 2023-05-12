
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);

  }

  // Получаем изначальные карточки
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  // Получаем информацию о юзере
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
      .then(this._checkResponse)
  }
  // Обновляем информацию о юзере
  updateUserInfo(name, about) {
    console.log('req info sending:', name, about)
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse)
  }

  // Обновляем аватар
  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse)
  }

  // Добавляем карточку
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse)
  }

  // Удаляем карточку
  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })

      .then(this._checkResponse)
  }

  // Ставим лайк
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers,
    })

      .then(this._checkResponse)
  }

  // Убираем лайк
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })

      .then(this._checkResponse)
  }
}


export const api = new Api({
  // baseUrl: 'https://api.kindaboii.nomoredomains.monster',
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
});

