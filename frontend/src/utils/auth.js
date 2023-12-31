// export const BASE_URL = 'https://auth.nomoreparties.co';
// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.mestechko.nomoredomainsmonster.ru';

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const register = (password, email) => {
  return (
    fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    })
      // .then((res) => {
      //   return res.json();
      // });
      .then((res) => getResponse(res))
  );
};

export const authorize = (password, email) => {
  return (
    fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, email }),
    })
      // .then((res) => res.json());
      .then((res) => getResponse(res))
  );
};

export const getContent = (token) => {
  // const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => getResponse(res));
};
