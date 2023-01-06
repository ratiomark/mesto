export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
  }
  open() {
    this.popup.classList.add('popup_active')
    document.addEventListener('keydown', this._handleEscClose.bind(this))
  }
  close() {
    this.popup.classList.remove('popup_active')
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
    this.popup.querySelector('.popup__close-button').addEventListener("click", this.close.bind(this))
    this.popup.addEventListener('click', this._handleCloseByOverlay.bind(this))
  }
}

