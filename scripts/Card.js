class Card {
  constructor({ name, link, alt }, selector, showCard) {
    this._name = name
    this._link = link
    this._alt = alt
    this._selector = selector
    this.showCard = showCard
  }

  _setTemplate() {
    this._template = document
      .querySelector(this._selector)
      .content
      .cloneNode(true)
      .querySelector('.card')
      .cloneNode(true)
  }

  _setDataInTemplate() {
    this._template.querySelector(".card__image").src = this._link;
    this._template.querySelector(".card__image").alt = this._alt;
    this._template.querySelector(".card__title").textContent = this._name;
  }

  _setEventListeners() {
    this._template.querySelector(".card__delete-icon").addEventListener('click', this._removeCard)
    this._template.querySelector(".card__like-button").addEventListener('click', this._toggleLikeState);
    this._template.querySelector(".card__image").addEventListener('click', () => {
      this.showCard({ name: this._name, link: this._link, alt: this._alt })
    })
  }

  _removeCard = evt => evt.target.closest('.card').remove();
  _toggleLikeState = evt => evt.target.classList.toggle('card__like-button_active');
  // _showCard = evt => {
  //   imgPopupShowCard.src = this._link;
  //   imgPopupShowCard.alt = this._alt;
  //   descriptionPopupShowCard.textContent = this._name;
  //   popupShowCard.classList.add('popup_active')
  //   document.addEventListener('keydown', closePopupByEsc)
  // }
  // _closeCardByESC = (event) => {
  //   if (event.key === "Escape" || event.key === "Esc") {
  //     popupShowCard.classList.remove('popup_active')
  //   }
  // }

  getCardHTML() {
    // this._setTemplate()
    this._setTemplate()
    this._setDataInTemplate()
    this._setEventListeners()
    return this._template;
  }

}
export { Card };