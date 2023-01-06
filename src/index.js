import initialCards from "../scripts/initialCards.js";
import {
  formElementEditProfile,
  formElementAddNewCard,
  editProfileButton,
  newCardButton,
  listWithCards,
} from "../utils/constants.js"
import { Card } from "../scripts/Card.js";
import { FormValidator, validationConfig } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { UserInfo } from '../scripts/UserInfo.js';
import '../pages/index.css';

const formElementEditProfileObject = new FormValidator(validationConfig, formElementEditProfile)
const formElementAddNewCardObject = new FormValidator(validationConfig, formElementAddNewCard)
formElementEditProfileObject.enableValidation()
formElementAddNewCardObject.enableValidation()

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

