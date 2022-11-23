const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.input',
  buttonSelector: '.popup__save-button',
  errorElemClass: 'message-error_active',
  inputElemErrorClass: 'input_error',
}

const showInputError = (formElement, inputElem, errorMessage, errorElemClass, inputElemErrorClass) => {
  const errorElem = formElement.querySelector(`.${inputElem.id}-error`)
  errorElem.textContent = errorMessage;
  errorElem.classList.add(errorElemClass);
  inputElem.classList.add(inputElemErrorClass)
}
const hideInputError = (formElement, inputElem, errorElemClass, inputElemErrorClass) => {
  const errorElem = formElement.querySelector(`.${inputElem.id}-error`)
  errorElem.textContent = '';
  errorElem.classList.remove(errorElemClass);
  inputElem.classList.remove(inputElemErrorClass)
}

const validateInput = (formElement, inputElem, errorElemClass, inputElemErrorClass) => {
  if (!inputElem.validity.valid) {
    showInputError(formElement, inputElem, inputElem.validationMessage, errorElemClass, inputElemErrorClass)
  } else {
    hideInputError(formElement, inputElem, errorElemClass, inputElemErrorClass)
  }
}

const hasInvalidInput = (inputList) => inputList.some(inputElem => !inputElem.validity.valid);

function validateForm(inputList, buttonSubmit) {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.disabled = false;
  }
}

function setListeners(formElement, inputSelector, buttonSelector, errorElemClass, inputElemErrorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonSubmit = formElement.querySelector(buttonSelector)
  validateForm(inputList, buttonSubmit);
  inputList.forEach(inputElem => {
    inputElem.addEventListener('input', () => {
      validateInput(formElement, inputElem, errorElemClass, inputElemErrorClass)
      validateForm(inputList, buttonSubmit)
    });
  })
}

const enableValidation = (config) => {
  const { formSelector, inputSelector, buttonSelector, errorElemClass, inputElemErrorClass } = config;
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(formElement => {
    setListeners(formElement, inputSelector, buttonSelector, errorElemClass, inputElemErrorClass)
  })
}

enableValidation(validationConfig)