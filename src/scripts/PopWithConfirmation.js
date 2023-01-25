import { Popup } from "./Popup";
class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, submitHandler, popupButtonConfirmationSelector }) {
    super(popupSelector)
    this._submitHandler = submitHandler
    this._submitButton = this._popup.querySelector(popupButtonConfirmationSelector)
    this._form = this._popup.querySelector('form')
    this._defaultButtonText = this._submitButton.textContent
  }
  setData(id, removeFromDOM) {
    this._idToDelete = id
    this._removeFromDOM = removeFromDOM
  }
  getData() {
    return { id: this._idToDelete, removeFromDOM: this._removeFromDOM }
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