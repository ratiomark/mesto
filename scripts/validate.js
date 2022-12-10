const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.input',
  buttonSelector: '.popup__save-button',
  inputElemErrorClass: 'input_error',
}

const showInputError = (formElement, inputElem, errorMessage, inputElemErrorClass) => {
  const errorElem = formElement.querySelector(`.${inputElem.id}-error`)
  errorElem.textContent = errorMessage;
  inputElem.classList.add(inputElemErrorClass)
}
const hideInputError = (formElement, inputElem, inputElemErrorClass) => {
  const errorElem = formElement.querySelector(`.${inputElem.id}-error`)
  errorElem.textContent = '';
  inputElem.classList.remove(inputElemErrorClass)
}

const validateInput = (formElement, inputElem, inputElemErrorClass) => {
  if (!inputElem.validity.valid) {
    showInputError(formElement, inputElem, inputElem.validationMessage, inputElemErrorClass)
  } else {
    hideInputError(formElement, inputElem, inputElemErrorClass)
  }
}
function resetValidationState(popup) {
  const formElement = popup.querySelector('.popup__form');
  const inputList = formElement.querySelectorAll('.input');
  const buttonSubmit = popup.querySelector('.popup__save-button')
  inputList.forEach(inputElem => hideInputError(formElement, inputElem, 'input_error',))
  validateForm(inputList, buttonSubmit)
}

const hasInvalidInput = inputList => Array.from(inputList).some(inputElem => !inputElem.validity.valid);

function validateForm(inputList, buttonSubmit) {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.disabled = false;
  }
}

function setListeners(formElement, inputSelector, buttonSelector, inputElemErrorClass) {
  const inputList = formElement.querySelectorAll(inputSelector);
  const buttonSubmit = formElement.querySelector(buttonSelector)
  inputList.forEach(inputElem => {
    inputElem.addEventListener('input', () => {
      validateInput(formElement, inputElem, inputElemErrorClass)
      validateForm(inputList, buttonSubmit)
    });
  })
}

const enableValidation = (config) => {
  const { formSelector, inputSelector, buttonSelector, inputElemErrorClass } = config;
  const forms = document.querySelectorAll(formSelector);
  forms.forEach(formElement => {
    setListeners(formElement, inputSelector, buttonSelector, inputElemErrorClass)
  })
}

export { resetValidationState, enableValidation, validationConfig }