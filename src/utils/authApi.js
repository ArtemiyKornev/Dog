const config = {
  baseUrl: "https://api.react-learning.ru",
  headers: {
    "content-type": "application/json",
  },
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject("Error");
};

// написание через классы

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }
  // POST https://api.react-learning.ru/signup // регистрация { ...data, group: 'group-id'}
  registerUser(data) {
    return fetch(`${this._baseUrl}/signup`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => onResponse(res));
  }
  // POST https://api.react-learning.ru/signin // авторизация
  login(dataUser) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(dataUser),
    }).then((res) => onResponse(res));
  }

  // POST https://api.react-learning.ru/forgot-password сброс пароля на почту
  resetPass(email) {
    return fetch(`${this._baseUrl}/forgot-password`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(email),
    }).then((res) => onResponse(res));
  }
  // PATCH https://api.react-learning.ru/password-reset/:token // смена пароля после подтверж
  changePass(token, password) {
    return fetch(`${this._baseUrl}/password-reset/${token}`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(password),
    }).then((res) => onResponse(res));
  }
}

export const authApi = new Api(config);
