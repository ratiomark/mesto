class Card {
  constructor({ name, link, likes = [], ownerId = true, _id },
    templateSelector,
    handleCardClick,
    setLike,
    unsetLike,
    myId,
    handleRemoveCard) {
    this._id = _id
    this._alt = name
    this._myId = myId
    this._link = link
    this._name = name
    this._setLike = setLike
    this._ownerId = ownerId
    this._unsetLike = unsetLike
    this._handleRemoveCard = handleRemoveCard
    this._handleCardClick = handleCardClick
    this._templateSelector = templateSelector
    this._likesCount = likes.length != 0 ? likes.length : ""
    this._isAlreadyLiked = likes.length != 0 ? likes.find(item => item["_id"] === myId) : false
    this.toggleCardLikeStateBound = this.toggleCardLikeState.bind(this)
  }

  _setTemplate() {
    this._cardFromTemplate = document
      .querySelector(this._templateSelector)
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
    this._cardCurrentCountLikes = this._cardFromTemplate.querySelector(".card__like-counter")
    this._cardCurrentCountLikes.textContent = this._likesCount;
    this._cardLikeButton = this._cardFromTemplate.querySelector(".card__like-button")
    this._isAlreadyLiked ? this._cardLikeButton.classList.add("card__like-button_active") : null
  }

  _setEventListeners() {
    if (this._ownerId === this._myId) {
      this._cardFromTemplate.querySelector(".card__delete-icon").addEventListener('click', this._removeCard.bind(this))
    } else {
      this._cardFromTemplate.querySelector('.card__delete-icon').remove()
    }
    this._cardLikeButton.addEventListener('click', this._toggleLikeState.bind(this));
    this._cardFromTemplate.querySelector(".card__image").addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link, alt: this._alt })
    })
  }

  _removeCard = () => {
    this._handleRemoveCard(this._id, this.removeFromDOM.bind(this))
  }

  toggleCardLikeState(response) {
    this._cardCurrentCountLikes.textContent = response.likes?.length === 0 ? "" : response.likes.length
    this._cardLikeButton.classList.toggle('card__like-button_active')
    this._isAlreadyLiked = !this._isAlreadyLiked
  }

  _toggleLikeState = () => {
    if (this._isAlreadyLiked) {
      this._unsetLike(this._id, this.toggleCardLikeStateBound)
      return
    }
    this._setLike(this._id, this.toggleCardLikeStateBound)
  };

  removeFromDOM() {
    this._cardFromTemplate.remove()
  }

  getCardHTML() {
    this._setTemplate()
    this._setDataInTemplate()
    this._setEventListeners()
    return this._cardFromTemplate;
  }

}

export { Card };