import {
  formElementEditProfile,
  formElementAddNewCard,
  formUpdateAvatar,
  editProfileButton,
  newCardButton,
  inputNameSelector,
  inputOccupationSelector,
  listWithCardsSelector,
  validationConfig,
  inputPopupConfirmation,
  profileAvatar,
  profileAvatarImage,
  profileAvatarImageSelector,
  popupButtonConfirmationSelector,
  cardTemplateSelector,
  myToken,
  baseUrl
} from "./utils/constants.js"
import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { Section } from "./scripts/Section.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithConfirmation } from "./scripts/PopWithConfirmation.js";
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

const apiHandleErrorBound = api.handleError.bind(api)

const createNewCard = (cardData, templateSelector, handleCardClick, setLike, unsetLike, myId, popupRemover, inputPopupConfirmation) => {
  const card = new Card(cardData,
    templateSelector,
    handleCardClick,
    setLike,
    unsetLike,
    myId,
    popupRemover,
    inputPopupConfirmation).getCardHTML()
  return card
}

const popupRemoveCard = new PopupWithConfirmation({
  popupSelector: '.popup_type_remove-card',
  submitHandler: (evt) => {
    evt.preventDefault()
    popupRemoveCard.setButtonStateIsLoading()
    const { id, cardToDelete } = popupRemoveCard.getData()
    api.deleteCard(id)
      .then(cardToDelete.remove())
      .then(popupRemoveCard.close())
      .catch(apiHandleErrorBound)
      .finally(popupRemoveCard.unsetButtonStateIsLoading())
  },
  popupButtonConfirmationSelector
});
popupRemoveCard.setEventListeners()

const showCard = cardDataObject => {
  popupShowCard.open(cardDataObject)
}
const setLike = (cardID, cardCurrentCountLikes, target, drawLike) => {
  api.setLike(cardID)
    .then(res => {
      cardCurrentCountLikes.textContent = res.likes?.length === 0 ? "" : res.likes.length
      target.classList.add('card__like-button_active')
      // alreadyLiked = true
      drawLike()
    })
    .catch(apiHandleErrorBound)
}

const unsetLike = (cardID, cardCurrentCountLikes, target, alreadyLiked) => {
  api.unsetLike(cardID)
    .then(res => {
      cardCurrentCountLikes.textContent = res.likes?.length === 0 ? "" : res.likes.length
      target.classList.remove('card__like-button_active')
      alreadyLiked()
    })
    .catch(apiHandleErrorBound)
}
// this._unsetLike(this._id, this._cardCurrentCountLikes, evt.target, alreadyLiked)
// evt.target
// this._isAlreadyLiked = false
// return

const cardsUploader = new Section({
  containerSelector: listWithCardsSelector,
  renderer: (cardData) => {
    const card = createNewCard(cardData,
      cardTemplateSelector,
      showCard,
      setLike,
      unsetLike,
      myId,
      (id, cardElement) => {
        popupRemoveCard.open()
        popupRemoveCard.setData(id, cardElement)
      })
    cardsUploader.addItemToEnd(card)
  }
})

const userInfoController = new UserInfo({ inputNameSelector, inputOccupationSelector, profileAvatarImageSelector })

Promise.all([api.getUserData(), api.getInitialCard()])
  .then(([userData, cards]) => {
    userInfoController.makeInitialUploadData(userData)
    myId = userData._id
    cardsUploader.renderItems(cards)
  })
  .catch(apiHandleErrorBound)

const formElementEditProfileObject = new FormValidator(validationConfig, formElementEditProfile)
const formElementAddNewCardObject = new FormValidator(validationConfig, formElementAddNewCard)
const formElementUpdateAvatar = new FormValidator(validationConfig, formUpdateAvatar)
formElementEditProfileObject.enableValidation()
formElementAddNewCardObject.enableValidation()
formElementUpdateAvatar.enableValidation()

const popupShowCard = new PopupWithImage('.popup_type_show-card');

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  submitHandler: (inputValuesObject) => {
    popupEditProfile.setButtonStateIsLoading()
    const editProfileRequest = api.editProfile.bind(api)
    const { name, about } = inputValuesObject
    editProfileRequest({ name, about })
      .then(() => {
        userInfoController.setUserInfo(inputValuesObject)
        popupEditProfile.close()
      })
      // .then(popupEditProfile.close())
      .catch(apiHandleErrorBound)
      .finally(popupEditProfile.unsetButtonStateIsLoading())
  }
});

const popupUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  submitHandler: (inputValuesObject) => {
    popupUpdateAvatar.setButtonStateIsLoading()
    const link = inputValuesObject['linkToNewAvatar']
    const updateAvatarRequest = api.updateAvatar.bind(api)
    updateAvatarRequest(link)
      .then(res => profileAvatarImage.updateAvatar({ avatar: res.avatar }))
      .then(popupUpdateAvatar.close())
      .catch(apiHandleErrorBound)
      .finally(popupUpdateAvatar.unsetButtonStateIsLoading())
  }
});

const popupAddNewCard = new PopupWithForm({
  popupSelector: '.popup_type_new-card',
  submitHandler: (inputValuesObject) => {
    popupAddNewCard.setButtonStateIsLoading()
    api.addCardRequest(inputValuesObject)
      .then(res => {
        const ownerId = res.owner._id
        const card = createNewCard({ ...res, ownerId },
          cardTemplateSelector,
          showCard,
          setLike,
          unsetLike,
          myId,
          (id, cardElement) => {
            popupRemoveCard.open()
            popupRemoveCard.setData(id, cardElement)
          })
        return card
      })
      .then(card => {
        cardsUploader.addItem(card)
      })
      .catch(apiHandleErrorBound)
      .finally(() => {
        popupAddNewCard.unsetButtonStateIsLoading()
        popupAddNewCard.close()
      })
  }
});

popupEditProfile.setEventListeners()
popupAddNewCard.setEventListeners()
popupShowCard.setEventListeners()
popupRemoveCard.setEventListeners()
popupUpdateAvatar.setEventListeners()

editProfileButton.addEventListener('click', () => {
  popupEditProfile.setValuesToInputs(userInfoController.getUserInfo())
  formElementEditProfileObject.resetValidationState()
  popupEditProfile.open()
});

newCardButton.addEventListener('click', () => {
  formElementAddNewCardObject.resetValidationState()
  popupAddNewCard.open();
});

profileAvatar.addEventListener("click", () => {
  formElementUpdateAvatar.resetValidationState()
  popupUpdateAvatar.open()
})

