export class Api {
  constructor({ baseUrl, headers }) {
    this.baseURL = baseUrl
    this.headers = headers
  }
  handleFirstResponse(res) {
    if (res.ok) return res.json()
    console.log("Похоже возникла проблемк а")
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  handleError(error) {
    console.log(`Произошла ошибка: ${error.name}`)
    console.log(`Сообщение ошибки: ${error.message}`)
  }

  getUserData() {
    return fetch(`${this.baseURL}/users/me`, { headers: this.headers })
      .then(this.handleFirstResponse)
      .catch(this.handleError)
  }
  getInitialCard() {
    return fetch(`${this.baseURL}/cards`, { headers: this.headers })
      .then(this.handleFirstResponse)
      .catch(this.handleError)
  }
  editProfile({name, about}) {
    return fetch(`${this.baseURL}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this.handleFirstResponse)
      .catch(this.handleError)
  }

  deleteCard(id) {
    return fetch(`${this.baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this.handleFirstResponse)
      .catch(this.handleError)
  }

  addCardRequest({ name, link }) {
    return fetch(`${this.baseURL}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this.handleFirstResponse)
      .catch(this.handleError)
  }
  updateAvatar(avatar) {
    return fetch(`${this.baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this.handleFirstResponse)
      .catch(this.handleError)
  }
  setLike(id) {
    return fetch(`${this.baseURL}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
    })
      .then(this.handleFirstResponse)
      .catch(this.handleError)
  }
  unsetLike(id) {
    return fetch(`${this.baseURL}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this.handleFirstResponse)
      .catch(this.handleError)
  }
}
