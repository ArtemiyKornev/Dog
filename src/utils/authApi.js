const config = {
  baseUrl: "https://api.react-learning.ru",
  headers: {
    "content-type": "application/json",
  },
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject("Error");
};

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  registrationUser(data) {
    return fetch(`${this._baseUrl}/signup`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => onResponse(res));
  }

  login(dataUser) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(dataUser),
    }).then((res) => onResponse(res));
  }

  resetPassword(email) {
    return fetch(`${this._baseUrl}/forgot-password`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(email),
    }).then((res) => onResponse(res));
  }

  changePassword(token, password) {
    return fetch(`${this._baseUrl}/password-reset/${token}`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(password),
    }).then((res) => onResponse(res));
  }
}

export const authApi = new Api(config);
