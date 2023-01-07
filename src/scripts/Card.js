class Card {
  constructor({ name, link, alt }, selector, handleCardClick) {
    this._name = name
    this._link = link
    this._alt = alt
    this._selector = selector
    this.handleCardClick = handleCardClick
  }

  _setTemplate() {
    this._cardFromTemplate = document
      .querySelector(this._selector)
      .content
      .cloneNode(true)
      .querySelector('.card')
      .cloneNode(true)
  }

  _setDataInTemplate() {
    this._image = this._cardFromTemplate.querySelector(".card__image")
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._cardFromTemplate.querySelector(".card__title").textContent = this._name;
  }

  _setEventListeners() {
    this._cardFromTemplate.querySelector(".card__delete-icon").addEventListener('click', this._removeCard)
    this._cardFromTemplate.querySelector(".card__like-button").addEventListener('click', this._toggleLikeState);
    this._cardFromTemplate.querySelector(".card__image").addEventListener('click', () => {
      this.handleCardClick({ name: this._name, link: this._link, alt: this._alt })
    })
  }

  _removeCard = (_) => this._cardFromTemplate.remove();
  _toggleLikeState = evt => evt.target.classList.toggle('card__like-button_active');

  getCardHTML() {
    this._setTemplate()
    this._setDataInTemplate()
    this._setEventListeners()
    return this._cardFromTemplate;
  }

}

export { Card };