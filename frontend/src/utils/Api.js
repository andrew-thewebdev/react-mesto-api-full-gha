class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.authToken = this.headers.authorization;
  }

  _validateResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._validateResponse.bind(this));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.authToken,
      },
    }).then(this._validateResponse.bind(this));
  }

  updateProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._validateResponse.bind(this));
  }

  sendCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._validateResponse.bind(this));
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json',
      },
    }).then(this._validateResponse.bind(this));
  }

  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json',
      },
    }).then(this._validateResponse.bind(this));
  }

  dislikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json',
      },
    }).then(this._validateResponse.bind(this));
  }

  changeLikeCardStatus(cardId, likedFlag) {
    if (!likedFlag) {
      // this.likeCard(cardId);
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this.authToken,
          'Content-Type': 'application/json',
        },
      }).then(this._validateResponse.bind(this));
    } else {
      // this.dislikeCard(cardId);
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this.authToken,
          'Content-Type': 'application/json',
        },
      }).then(this._validateResponse.bind(this));
    }
  }

  updateAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._validateResponse.bind(this));
  }

  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.authToken,
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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '40147b95-7947-4dd9-abfc-394e10acaef8',
    'Content-Type': 'application/json',
  },
});

export default api;
