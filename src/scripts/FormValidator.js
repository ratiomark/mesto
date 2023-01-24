class FormValidator {
  constructor({ inputSelector, buttonSelector, inputElemErrorClass }, form) {
    this._inputElemErrorClass = inputElemErrorClass;
    this._form = form;
    this._inputList = this._form.querySelectorAll(inputSelector);
    this._buttonSubmit = this._form.querySelector(buttonSelector)
  }

  _showInputError(inputElem, errorMessage) {
    this._errorElem = this._form.querySelector(`.${inputElem.id}-error`)
    this._errorElem.textContent = errorMessage;
    inputElem.classList.add(this._inputElemErrorClass)
  }

  _hideInputError(inputElem) {
    this._errorElem = this._form.querySelector(`.${inputElem.id}-error`)
    this._errorElem.textContent = '';
    inputElem.classList.remove(this._inputElemErrorClass)
  }

  _validateInput(inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage)
    } else {
      this._hideInputError(inputElem)
    }
  }

  _hasInvalidInput(inputList) {
    return Array.from(inputList).some(inputElem => !inputElem.validity.valid)
  }

  _validateForm() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.disabled = false;
    }
  }

  _setListeners() {
    this._inputList.forEach(inputElem => {
      inputElem.addEventListener('input', () => {
        this._validateInput(inputElem)
        this._validateForm(this._inputList)
      });
    })
  }

  resetValidationState() {
    this._inputList.forEach(inputElem => this._hideInputError(inputElem, this._inputElemErrorClass))
    this._validateForm()
  }

  enableValidation() {
    this._setListeners()
  }
}

export { FormValidator }