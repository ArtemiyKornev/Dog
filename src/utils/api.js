const freshHeaders = () => {
  return {
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };
};

const config = {
  baseUrl: "https://api.react-learning.ru",
  headers: {
    "content-type": "application/json",
    // мой токен
    Authorization: localStorage.getItem("token"),
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDA2MjFlODRlZTQxOTk3NWZiZDJkZWMiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjgwNTQyMzQ5LCJleHAiOjE3MTIwNzgzNDl9.kPnPHZMAajKlRxk5XSD59gwsc4cisWq5LJFiK5lQwRI",
    // my id "640621e84ee419975fbd2dec"
  },
  freshHeaders: freshHeaders,
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject("Error");
};

// написание через классы

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
    this._freshHeaders = data.freshHeaders;
  }
  getProductList(page = 1) {
    return fetch(`${this._baseUrl}/products?page=${page}`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res));
  }

  getProductById(id) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res));
  }
  editProductById(id, data) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      ...this._freshHeaders(),
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => onResponse(res));
  }
  addProduct() {
    return fetch(`${this._baseUrl}/products`, {
      ...this._freshHeaders(),
      method: "POST",
      body: JSON.stringify({
        name: "Рога оленя для собак весом от 10 до 30 кг. Размер L",
        price: 800,
        discount: 0,
        wight: "1 шт",
        description:
          "Рога северного оленя содержат очень много полезных, 100% натуральных, питательных веществ и ничего искусственного.Природный источник кальция, витаминов, аминокислот, микроэлементов, глюкозамина и хондроитина. Гипоаллергенные - свободные от аллергенных веществ.",
        available: true,
        stock: 10,
        pictures: "https://react-learning.ru/image-compressed/16.jpg",
      }),
    }).then(onResponse);
  }

  updateProduct(productId, data) {
    return fetch(`${this._baseUrl}/products/${productId}`, {
      ...this._freshHeaders(),
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => onResponse(res));
  }

  deleteProductId(productId) {
    return fetch(`${this._baseUrl}/products/${productId}`, {
      ...this._freshHeaders(),
      method: "DELETE",
    }).then(onResponse);
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res));
  }

  searchProducts(query) {
    return fetch(`${this._baseUrl}/products/search?query=${query}`, {
      ...this._freshHeaders(),
    }).then((res) => onResponse(res));
  }
  // like - true/false
  changeLikeProductStatus(productId, like) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      ...this._freshHeaders(),
      method: like ? "PUT" : "DELETE",
    }).then((res) => onResponse(res));
  }
  deleteLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      ...this._freshHeaders(),
      method: "DELETE",
    }).then((res) => onResponse(res));
  }
  addLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      ...this._freshHeaders(),
      method: "PUT",
    }).then((res) => onResponse(res));
  }
  deleteProduct(productId) {
    return fetch(`${this._baseUrl}/products/${productId}`, {
      ...this._freshHeaders(),
      method: "DELETE",
    }).then((res) => onResponse(res));
  }
  deleteCommentProduct(productId, reviewId) {
    return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
      ...this._freshHeaders(),
      method: "DELETE",
    }).then((res) => onResponse(res));
  }
  getAllCommentProducts() {
    return fetch(`${this._baseUrl}/products/review/`, {
      ...this._freshHeaders(),
      method: "GET",
    }).then((res) => onResponse(res));
  }
  getCommentProduct(productId) {
    return fetch(`${this._baseUrl}/products/review/${productId}`, {
      ...this._freshHeaders(),
      method: "GET",
    }).then((res) => onResponse(res));
  }
  addCommentProduct(productId) {
    return fetch(`${this._baseUrl}/products/review/${productId}`, {
      ...this._freshHeaders(),
      method: "POST",
    }).then(onResponse);
  }
}

export const api = new Api(config);

// написание без класов
// export const  getProductList = ()  => {
//   return fetch (`${config.baseUrl}/products` , {
//     headers: config.headers,
//   }).then((res) => onResponse(res));
// }
// export const  getUsersInfo = ()  => {
//   return fetch (`${config.baseUrl}/users/me` , {
//     headers: config.headers,
//   }).then((res) => onResponse(res));
// }
// export const  searchProducts = ()  => {
//   return fetch (`${config.baseUrl}products/search?query=${query}` , {
//     headers: config.headers,
//   }).then((res) => onResponse(res));
// }
