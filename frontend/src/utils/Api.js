class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    // this.headers = options.headers;
    // this.authToken = this.headers.authorization;
  }

  _validateResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.baseUrl}/users/me`, {
      // headers: this.headers,
      headers: {
        authorization: token,
      },
    }).then(this._validateResponse.bind(this));
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        // authorization: this.authToken,
        authorization: `Bearer ${token}`,
      },
    }).then(this._validateResponse.bind(this));
  }

  updateProfile(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        // authorization: this.authToken,
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._validateResponse.bind(this));
  }

  sendCard(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        // authorization: this.authToken,
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._validateResponse.bind(this));
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        // authorization: this.authToken,
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._validateResponse.bind(this));
  }

  likeCard(cardId) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        // authorization: this.authToken,
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._validateResponse.bind(this));
  }

  dislikeCard(cardId) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        // authorization: this.authToken,
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this._validateResponse.bind(this));
  }

  changeLikeCardStatus(cardId, likedFlag) {
    const token = localStorage.getItem('jwt');

    if (!likedFlag) {
      // this.likeCard(cardId);
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          // authorization: this.authToken,
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(this._validateResponse.bind(this));
    } else {
      // this.dislikeCard(cardId);
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          // authorization: this.authToken,
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(this._validateResponse.bind(this));
    }
  }

  updateAvatar(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        // authorization: this.authToken,
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._validateResponse.bind(this));
  }

  setUserInfo(data) {
    const token = localStorage.getItem('jwt');

    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        // authorization: this.authToken,
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._validateResponse.bind(this));
  }
}

const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  // headers: {
  //   authorization: '40147b95-7947-4dd9-abfc-394e10acaef8',
  //   'Content-Type': 'application/json',
  // },
  baseUrl: 'http://localhost:3000',
});

export default api;
