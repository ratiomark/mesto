import {
  formElementEditProfile,
  formElementAddNewCard,
  formUpdateAvatar,
  editProfileButton,
  newCardButton,
  inputNameSelector,
  inputOccupationSelector,
  listWithCards,
  validationConfig,
  inputPopupConfirmation,
  profileAvatar,
  profileAvatarImage,
  profileNameElement,
  profileOccupationElement,
  cardTemplateSelector,
  myToken,
  baseUrl
} from "./utils/constants.js"
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { UserInfo } from './scripts/UserInfo.js';
import { Api } from "./scripts/Api.js";
import './pages/index.css';

let myId;
const api = new Api({
  baseUrl,
  headers: {
    authorization: myToken,
    'Content-Type': 'application/json'
  }
});

const uploadInitialUserData = ({ name, about, avatar, _id }) => {
  profileAvatarImage.src = avatar
  profileNameElement.textContent = name
  profileOccupationElement.textContent = about
  myId = _id
}

const popupRemoveCard = new PopupWithForm({
  popupSelector: '.popup_type_remove-card',
  submitHandler: (hiddenInputValue) => {
    const id = hiddenInputValue['remove-card']
    const deleteCardRequest = api.deleteCard.bind(api)
    deleteCardRequest(id)
      .then(document.querySelector(`[data-id="${id}"]`).remove())
      .then(popupRemoveCard.close())
  }
});

const showCard = cardDataObject => {
  popupShowCard.open(cardDataObject)
}

const cardsUploader = new Section({
  initialCardRequest: api.getInitialCard.bind(api),
  containerSelector: listWithCards,
  renderer: (cardData) => {
    const card = new Card(cardData,
      cardTemplateSelector,
      showCard,
      api.setLike.bind(api),
      api.unsetLike.bind(api),
      myId,
      popupRemoveCard,
      inputPopupConfirmation)
      .getCardHTML()
    cardsUploader.container.append(card)
  }
})

api.getUserData()
  .then(res => uploadInitialUserData(res))
  .then(cardsUploader.renderItems())

const formElementEditProfileObject = new FormValidator(validationConfig, formElementEditProfile)
const formElementAddNewCardObject = new FormValidator(validationConfig, formElementAddNewCard)
const formElementUpdateAvatar = new FormValidator(validationConfig, formUpdateAvatar)
formElementEditProfileObject.enableValidation()
formElementAddNewCardObject.enableValidation()
formElementUpdateAvatar.enableValidation()

const popupShowCard = new PopupWithImage('.popup_type_show-card');
const userInfoShow = new UserInfo(inputNameSelector, inputOccupationSelector)

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  submitHandler: (inputValuesObject) => {
    popupEditProfile.submitButton.textContent = "Сохранение..."
    const editProfileRequest = api.editProfile.bind(api)
    const { name, occupation } = inputValuesObject
    editProfileRequest({ name, about: occupation })
      .then(userInfoShow.setUserInfo(inputValuesObject))
      .then(() => {
        popupEditProfile.close()
        popupEditProfile.submitButton.textContent = "Сохранить"
      })


  }
});

const popupUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  submitHandler: (inputValuesObject) => {
    const link = inputValuesObject['linkToNewAvatar']
    const updateAvatarRequest = api.updateAvatar.bind(api)
    updateAvatarRequest(link)
      .then(res => {
        profileAvatarImage.src = res.avatar
        popupUpdateAvatar.close()
      })
  }
});

const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  submitHandler: (inputValuesObject) => {
    const postRequest = api.addCardRequest.bind(api)
    postRequest(inputValuesObject)
      .then(res => {
        const card = new Card(res,
          cardTemplateSelector,
          showCard,
          api.setLike.bind(api),
          api.unsetLike.bind(api),
          myId,
          popupRemoveCard,
          inputPopupConfirmation)
          .getCardHTML()
        return card
      })
      .then(card => {
        popupAddNewCard.close()
        cardsUploader.addItem(card)
      })
  }
});

popupEditProfile.setEventListeners()
popupAddNewCard.setEventListeners()
popupShowCard.setEventListeners()
popupRemoveCard.setEventListeners()
popupUpdateAvatar.setEventListeners()

editProfileButton.addEventListener('click', () => {
  popupEditProfile.setValuesToInputs(userInfoShow.getUserInfo())
  formElementEditProfileObject.resetValidationState()
  popupEditProfile.open()
});

newCardButton.addEventListener('click', () => {
  formElementAddNewCardObject.resetValidationState()
  popupAddNewCard.open();
});

profileAvatar.addEventListener("click", (evt) => {
  formElementUpdateAvatar.resetValidationState()
  popupUpdateAvatar.open()
})

