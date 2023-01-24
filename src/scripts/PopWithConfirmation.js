import { Popup } from "./Popup";
class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, submitHandler, popupButtonConfirmationSelector }) {
    super(popupSelector)
    this._submitHandler = submitHandler
    this._submitButton = this._popup.querySelector(popupButtonConfirmationSelector)
    this._form = this._popup.querySelector('form')
    this._defaultButtonText = this._submitButton.textContent
  }
  setData(id, cardToDelete) {
    this._idToDelete = id
    this._cardToDelete = cardToDelete
  }
  getData() {
    return { id: this._idToDelete, cardToDelete: this._cardToDelete }
  }

  setButtonStateIsLoading() {
    this._submitButton.textContent = "В процессе..."
  }
  unsetButtonStateIsLoading() {
    this._submitButton.textContent = this._defaultButtonText
  }
  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._submitHandler);
  }
}
export { PopupWithConfirmation }