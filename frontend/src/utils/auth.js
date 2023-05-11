// auth.js

class Auth {
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

  // Регистрация

  register({ password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
      .then(this._checkResponse)

  };

  // Авторизация
  authorize({ password, email }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "email": email,
      })
    })
      .then(this._checkResponse)
  }

  // Выход из профиля
  signout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(this._checkResponse)
  }

  // Получаем контект о юзере
  getContent() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
    })
      .then(this._checkResponse)
      .then(data => data)
  }
}

// Экземпляр с аутентификацией
export const auth = new Auth({
  // baseUrl: 'https://api.kindaboii.nomoredomains.monster',
  baseUrl: 'http://localhost:3000',
});
