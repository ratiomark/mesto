export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }
  open() {
    this._popup.classList.add('popup_active')
    document.addEventListener('keydown', this._handleEscClose)
  }
  close() {
    this._popup.classList.remove('popup_active')
    document.removeEventListener("keydown", this._handleEscClose)
  }
  _handleEscClose(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      this.close();
    }
  }
  _handleCloseByOverlay(event) {
    if (event.target == event.currentTarget) {
      this.close()
    }
  }
  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener("click", this.close.bind(this))
    this._popup.addEventListener('click', this._handleCloseByOverlay.bind(this))
  }
}

