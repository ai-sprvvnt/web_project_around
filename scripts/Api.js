// scripts/Api.js

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // --- Métodos internos de ayuda ---

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // si el servidor devuelve un error, rechazamos la promesa
    return Promise.reject(`Error: ${res.status}`);
  }

  _handleError(err) {
    // aquí puedes mejorar la lógica de manejo de error
    console.log(`API error: ${err}`);
    return Promise.reject(err);
  }

  // --- Métodos públicos de la API ---

  // 1) Información del usuario
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // 2) Tarjetas iniciales
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // 3) Actualizar información del usuario (name + about)
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers, // ya incluye authorization y Content-Type
      body: JSON.stringify({ name, about }),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // Añadir una nueva tarjeta
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers, // incluye authorization + Content-Type
      body: JSON.stringify({ name, link }),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // Eliminar una tarjeta por ID
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // Añadir "me gusta" a una tarjeta
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // Quitar "me gusta" de una tarjeta
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // Devuelve [userInfo, cards]
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  // - addLike(cardId)
  // - removeLike(cardId)
  // - updateAvatar(data)
}

export default Api;
