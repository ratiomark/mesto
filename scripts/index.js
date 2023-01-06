import { Card } from "./Card.js"
import initialCards from "./initialCards.js";
import { FormValidator, validationConfig } from "./FormValidator.js"
// popups and forms
const popupEditProfile2 = document.querySelector('.popup_type_edit-profile');
const popupAddNewCard2 = document.querySelector('.popup_type_new-card');
// const popupShowCard = document.querySelector('.popup_type_show-card');
const formElementEditProfile = popupEditProfile2.querySelector('form');
const formElementAddNewCard = popupAddNewCard2.querySelector('form');
const formElementEditProfileObject = new FormValidator(validationConfig, formElementEditProfile)
const formElementAddNewCardObject = new FormValidator(validationConfig, formElementAddNewCard)
formElementEditProfileObject.enableValidation()
formElementAddNewCardObject.enableValidation()
// buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__new-card-button');
// other
const listWithCards = ".cards__list";

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach(item => this._renderer(item))
  }
  addItem(element) {
    this.container.prepend(element)
  }
}

class Popup {
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

class PopupWithImage extends Popup {
  open({ link, name, alt }) {
    this._imgPopupShowCard = this.popup.querySelector('.popup__image');
    this._descriptionPopupShowCard = this.popup.querySelector('.popup__image-description');
    this._imgPopupShowCard.src = link;
    this._imgPopupShowCard.alt = alt;
    this._descriptionPopupShowCard.textContent = name;
    super.open()
  }
}

class PopupWithForm extends Popup {
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

class UserInfo {
  constructor(nameInputId, occupationInputId) {
    this.nameInput = document.querySelector(nameInputId)
    this.occupationInput = document.querySelector(occupationInputId)
    this.profileNameTextValue = document.querySelector('.profile__name');
    this.profileOccupationTextValue = document.querySelector('.profile__occupation');
  }
  getUserInfo() {
    return { name: this.profileNameTextValue.textContent, occupation: this.profileOccupationTextValue.textContent }
  }
  setValuesFromProfileToInputs({ name, occupation }) {
    this.nameInput.value = name;
    this.occupationInput.value = occupation;
  }
  setUserInfo({ name, occupation }) {
    this.profileNameTextValue.textContent = name
    this.profileOccupationTextValue.textContent = occupation
  }

}
const userInfoShow = new UserInfo("#popup__name", "#popup__occupation")

const popupEditProfile = new PopupWithForm(
  '.popup_type_edit-profile',
  (event) => {
    event.preventDefault()
    userInfoShow.setUserInfo(popupEditProfile._getInputValues())
    popupEditProfile.close()
  });

const popupAddNewCard = new PopupWithForm(
  '.popup_type_new-card',
  (event) => {
    event.preventDefault()
    const userInputDataObject = popupAddNewCard._getInputValues()
    userInputDataObject['alt'] = "Картинка к карточке"
    const card = createNewCard(userInputDataObject, "#card-item", showCard)
    cardsUploader.addItem(card)
    popupAddNewCard.close()
  });

const popupShowCard = new PopupWithImage('.popup_type_show-card');
popupEditProfile.setEventListeners()
popupAddNewCard.setEventListeners()
popupShowCard.setEventListeners()

const showCard = cardDataObject => {
  popupShowCard.open(cardDataObject)
}
const createNewCard = (cardData, templateSelector, showCardFunction) => {
  const card = new Card(cardData, templateSelector, showCardFunction).getCardHTML();
  return card;
}

// initial cards upload
const cardsUploader = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = createNewCard(cardData, "#card-item", showCard)
    cardsUploader.container.append(card)
  }
}, listWithCards)

cardsUploader.renderItems()

editProfileButton.addEventListener('click', () => {
  userInfoShow.setValuesFromProfileToInputs(userInfoShow.getUserInfo())
  formElementEditProfileObject.resetValidationState()
  popupEditProfile.open()
});

newCardButton.addEventListener('click', () => {
  formElementAddNewCardObject.resetValidationState()
  popupAddNewCard.open();
});

