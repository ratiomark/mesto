import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector)
    this._submitCallback = submitCallback;
  }
  _getInputValues() {
    this._inputs = this.popup.querySelectorAll('input')
    this._inputValueObject = {}
    this._inputs.forEach(i => this._inputValueObject[i.name] = i.value)
    return this._inputValueObject
  }
  setEventListeners() {
    super.setEventListeners()
    this.form = this.popup.querySelector('.popup__form')
    this.form.addEventListener('submit', this._submitCallback)
  }
  close() {
    super.close()
    this.form.reset()
  }
}