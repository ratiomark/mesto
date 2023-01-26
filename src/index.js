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
  profileAvatar,
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
    const { id, removeFromDOM } = popupRemoveCard.getData()
    api.deleteCard(id)
      .then(removeFromDOM())
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
const setLike = (cardID, toggleCardLikeState) => {
  api.setLike(cardID)
    .then(toggleCardLikeState)
    .catch(apiHandleErrorBound)
}

const unsetLike = (cardID, toggleCardLikeState) => {
  api.unsetLike(cardID)
    .then(toggleCardLikeState)
    .catch(apiHandleErrorBound)
}

const cardsUploader = new Section({
  containerSelector: listWithCardsSelector,
  renderer: (cardData) => {
    const card = createNewCard(cardData,
      cardTemplateSelector,
      showCard,
      setLike,
      unsetLike,
      myId,
      (id, removeFromDOM) => {
        popupRemoveCard.open()
        popupRemoveCard.setData(id, removeFromDOM)
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
    const { name, about } = inputValuesObject
    // это странно, последний код, который я отправил не содержал editProfileRequest = api.editProfile.bind(api), но на ревью вы мне отметили этот момент. Я полез в код, а там нет такого, там как у меня сейчас, странно...
    api.editProfile({ name, about })
      .then((res) => {
        userInfoController.setUserInfo(res)
        popupEditProfile.close()
      })
      .catch(apiHandleErrorBound)
      .finally(popupEditProfile.unsetButtonStateIsLoading())
  }
});

const popupUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  submitHandler: (inputValuesObject) => {
    popupUpdateAvatar.setButtonStateIsLoading()
    const link = inputValuesObject['linkToNewAvatar']
    api.updateAvatar(link)
      .then(res => userInfoController.setUserImage(res))
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
          (id, removeFromDOM) => {
            popupRemoveCard.open()
            popupRemoveCard.setData(id, removeFromDOM)
          })
        return card
      })
      .then(card => {
        cardsUploader.addItem(card)
        popupAddNewCard.close()
      })
      .catch(apiHandleErrorBound)
      .finally(popupAddNewCard.unsetButtonStateIsLoading())
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

