import { Popup } from "./Popup";


export class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector)
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form')
    this._inputs = this._popup.querySelectorAll('input')
    this.submitButton = this._popup.querySelector('[type=Submit]')
  }
  _getInputValues() {
    const inputValueObject = {}
    this._inputs.forEach(i => inputValueObject[i.name] = i.value)
    return inputValueObject
  }
  setValuesToInputs(valuesObject) {
    this._inputs.forEach(input => input.value = valuesObject[input.name])
  }
  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (event) => {
      event.preventDefault()
      this._submitHandler(this._getInputValues())
    })
  }
  close() {
    super.close()
    this._form.reset()
  }
}