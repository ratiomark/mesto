const validationConfig = {
  inputSelector: '.input',
  buttonSelector: '.popup__save-button',
  inputElemErrorClass: 'input_error',
}

class FormValidator {
  constructor({ inputSelector, buttonSelector, inputElemErrorClass }, form) {
    this.inputSelector = inputSelector;
    this.buttonSelector = buttonSelector;
    this.inputElemErrorClass = inputElemErrorClass;
    this.form = form;
  }

  _showInputError(formElement, inputElem, errorMessage, inputElemErrorClass) {
    this.errorElem = formElement.querySelector(`.${inputElem.id}-error`)
    this.errorElem.textContent = errorMessage;
    inputElem.classList.add(inputElemErrorClass)
  }

  _hideInputError(formElement, inputElem, inputElemErrorClass) {
    this.errorElem = formElement.querySelector(`.${inputElem.id}-error`)
    this.errorElem.textContent = '';
    inputElem.classList.remove(inputElemErrorClass)
  }

  _validateInput(formElement, inputElem, inputElemErrorClass) {
    if (!inputElem.validity.valid) {
      this._showInputError(formElement, inputElem, inputElem.validationMessage, inputElemErrorClass)
    } else {
      this._hideInputError(formElement, inputElem, inputElemErrorClass)
    }
  }

  _hasInvalidInput(inputList) {
    return Array.from(inputList).some(inputElem => !inputElem.validity.valid)
  }

  _validateForm(inputList, buttonSubmit) {
    if (this._hasInvalidInput(inputList)) {
      buttonSubmit.disabled = true;
    } else {
      buttonSubmit.disabled = false;
    }
  }

  _setListeners(formElement, inputSelector, buttonSelector, inputElemErrorClass) {
    this.inputList = formElement.querySelectorAll(inputSelector);
    this.buttonSubmit = formElement.querySelector(buttonSelector)
    this.inputList.forEach(inputElem => {
      inputElem.addEventListener('input', () => {
        this._validateInput(formElement, inputElem, inputElemErrorClass)
        this._validateForm(this.inputList, this.buttonSubmit)
      });
    })
  }

  resetValidationState() {
    this.inputList.forEach(inputElem => this._hideInputError(this.form, inputElem, 'input_error',))
    this._validateForm(this.inputList, this.buttonSubmit)
  }

  enableValidation() {
    this._setListeners(this.form, this.inputSelector, this.buttonSelector, this.inputElemErrorClass)
  }
}

export { FormValidator, validationConfig }