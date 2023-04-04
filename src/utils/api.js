const config = {
  baseUrl: "https://api.react-learning.ru",
  headers: {
    "content-type": "application/json",
    // мой токен
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDA2MjFlODRlZTQxOTk3NWZiZDJkZWMiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjgwNTQyMzQ5LCJleHAiOjE3MTIwNzgzNDl9.kPnPHZMAajKlRxk5XSD59gwsc4cisWq5LJFiK5lQwRI",
      // my id "640621e84ee419975fbd2dec"
    
  },
};

const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject('Error');
};

// написание через классы

class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }
  getProductList(page = 1) {
    return fetch(`${this._baseUrl}/products?page=${page}`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }

  getProductById(id) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }
  editProductById(id, data) {
    return fetch(`${this._baseUrl}/products/${id}`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => onResponse(res));
  }
  addProduct() {
    return fetch(`${this._baseUrl}/products`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        "name": "Желудки утиные сушено-вяленые",
        "price": 550,
        "discount": 15,
        "wight": "100 г",
        "description": "Утиные желудки содержат большое количество белка, а также витамины и минеральные элементы, необходимые организму вашего питомца. Их употребление способствует росту уровня гемоглобина в крови, улучшению состояния шерсти, зубов, повышению тонуса, быстрому восстановлению сил.",
        // "isFavorite": true,
        // "isCart": false,
        "available": true,
        "stock": 10,
        "pictures": "https://react-learning.ru/image-compressed/1.jpg"
      }),
    }).then(onResponse);
  }

  updateProduct(productId, data) {
    return fetch(`${this._baseUrl}/products/${productId}`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data)  
  }).then((res) => onResponse(res));
  }

  deleteProductId(productId){
   return fetch(`${this._baseUrl}/products/${productId}`, {
    headers: this._headers,
     method: 'DELETE'   
    }).then(onResponse); 
}
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }
  searchProducts(query) {
    return fetch(`${this._baseUrl}/products/search?query=${query}`, {
      headers: this._headers,
    }).then((res) => onResponse(res));
  }
  // like - true/false
  changeLikeProductStatus(productId, like) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      headers: this._headers,
      method: like ? "PUT" : "DELETE",
    }).then((res) => onResponse(res));
  }
  deleteLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => onResponse(res));
  }
  addLike(productId) {
    return fetch(`${this._baseUrl}/products/likes/${productId}`, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => onResponse(res));
  }
  deleteProduct(productId) {
    return fetch(`${this._baseUrl}/products/${productId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => onResponse(res));
  }
  deleteCommentProduct(productId, reviewId) {
    return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
        headers: this._headers,
        method: 'DELETE'
    }).then((res) => onResponse(res));
}

getAllCommentProducts() {
    return fetch(`${this._baseUrl}/products/review/`, {
        headers: this._headers,
        method: 'GET'
    }).then((res) => onResponse(res));
}

getCommentProduct(productId) {
    return fetch(`${this._baseUrl}/products/review/${productId}`, {
        headers: this._headers,
        method: 'GET'
    }).then((res) => onResponse(res));
}

addCommentProduct(productId) {
  return fetch(`${this._baseUrl}/products/review/${productId}`, {
    headers: this._headers,
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
