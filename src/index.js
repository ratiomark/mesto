import initialCards from "./scripts/initialCards.js";
import {
  formElementEditProfile,
  formElementAddNewCard,
  editProfileButton,
  newCardButton,
  inputNameSelector,
  inputOccupationSelector,
  listWithCards,
} from "./utils/constants.js"
import { Card } from "./scripts/Card.js";
import { FormValidator, validationConfig } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { UserInfo } from './scripts/UserInfo.js';
import './pages/index.css';

const formElementEditProfileObject = new FormValidator(validationConfig, formElementEditProfile)
const formElementAddNewCardObject = new FormValidator(validationConfig, formElementAddNewCard)
formElementEditProfileObject.enableValidation()
formElementAddNewCardObject.enableValidation()

const userInfoShow = new UserInfo(inputNameSelector, inputOccupationSelector)

const popupEditProfile = new PopupWithForm(
  '.popup_type_edit-profile',
  // submitHandler:(inputValuesObject) =>
  (inputValuesObject) => {
    userInfoShow.setUserInfo(inputValuesObject)
  });

const popupAddNewCard = new PopupWithForm(
  '.popup_type_new-card',
  (inputValuesObject) => {
    const userInputDataObject = inputValuesObject
    userInputDataObject['alt'] = userInputDataObject["name"]
    const card = createNewCard(userInputDataObject, "#card-item", showCard)
    cardsUploader.addItem(card)
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

const cardsUploader = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = createNewCard(cardData, "#card-item", showCard)
    cardsUploader.container.append(card)
  }
}, listWithCards)

cardsUploader.renderItems()

editProfileButton.addEventListener('click', () => {
  popupEditProfile.setValuesToInputs(userInfoShow.getUserInfo())
  formElementEditProfileObject.resetValidationState()
  popupEditProfile.open()
});

newCardButton.addEventListener('click', () => {
  formElementAddNewCardObject.resetValidationState()
  popupAddNewCard.open();
});

