import { Card } from "./Card.js"
import initialCards from "./initialCards.js";
// import { resetValidationState } from "./validate.js"
import { resetValidationState, enableValidation, validationConfig } from "./validate.js"
// popupShowCard, closePopupByEsc, imgPopupShowCard, descriptionPopupShowCard
// popups and forms
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupShowCard = document.querySelector('.popup_type_show-card');
const popupList = document.querySelectorAll('.popup');
const formElementEditProfile = popupEditProfile.querySelector('form');
const formElementAddNewCard = popupAddNewCard.querySelector('form');
// buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__new-card-button');
const closeButtons = document.querySelectorAll('.popup__close-button')
// inputs
const nameInput = popupEditProfile.querySelector('.popup__name');
const occupationInput = popupEditProfile.querySelector('.popup__occupation');
const nameInputNewCard = popupAddNewCard.querySelector('.popup__name');
const linkInputNewCard = popupAddNewCard.querySelector('.popup__link');
// other
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const imgPopupShowCard = popupShowCard.querySelector('.popup__image');
const descriptionPopupShowCard = popupShowCard.querySelector('.popup__image-description');
const listWithCards = document.querySelector(".cards__list");
const templateCard = document.querySelector("#card-item");

// popup functions
const closePopupByEsc = (event) => {
  if (event.key === "Escape" || event.key === "Esc") {
    const popup = document.querySelector(".popup_active");
    closePopup(popup)
  }
}

const openPopup = popup => {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closePopupByEsc)
};

const closePopup = popup => {
  popup.classList.remove('popup_active')
  document.removeEventListener('keydown', closePopupByEsc)
}

const resetForm = formToReset => formToReset.reset();
const setDataInPopupProfileEdit = () => {
  nameInput.value = profileName.textContent
  occupationInput.value = profileOccupation.textContent
}

const setDataFromProfileEditToPage = () => {
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
}

// у всех изображений есть alt, подтягивается из template, добавьте карточку с поломанной ссылкой, увидите alt
const setDataFromCardToPopup = ({ link, name, alt }) => {
  imgPopupShowCard.src = link;
  imgPopupShowCard.alt = alt;
  descriptionPopupShowCard.textContent = name;
}
const getDataForNewCardFromUserInput = () => (
  {
    name: nameInputNewCard.value,
    link: linkInputNewCard.value,
    alt: nameInputNewCard.value
  });

const showCard = cardDataObject => {
  setDataFromCardToPopup(cardDataObject)
  openPopup(popupShowCard)
}

// initial cards upload
const addInitialCard = (card, placeForCard) => placeForCard.append(card);

initialCards.forEach(cardData => {
  const card = new Card(cardData, "#card-item", showCard).getCardHTML()
  addInitialCard(card, listWithCards)
});

enableValidation(validationConfig)
const addNewCard = (card, placeForCard) => placeForCard.prepend(card);

//forms handlers  
const handleSubmitProfileEditForm = (evt) => {
  evt.preventDefault();
  setDataFromProfileEditToPage()
  closePopup(popupEditProfile)
}

const handleSubmitNewCard = (evt) => {
  evt.preventDefault();
  const userInputDataObject = getDataForNewCardFromUserInput()
  const card = new Card(userInputDataObject, "#card-item").getCardHTML()
  addNewCard(card, listWithCards)
  closePopup(popupAddNewCard)
}

// main listeners
editProfileButton.addEventListener('click', () => {
  setDataInPopupProfileEdit()
  resetValidationState(popupEditProfile)
  openPopup(popupEditProfile);
});
formElementEditProfile.addEventListener('submit', handleSubmitProfileEditForm)
newCardButton.addEventListener('click', () => {
  resetForm(formElementAddNewCard)
  resetValidationState(popupAddNewCard)
  openPopup(popupAddNewCard);
});
formElementAddNewCard.addEventListener('submit', handleSubmitNewCard)
closeButtons.forEach(i => i.addEventListener('click', () => {
  closePopup(i.closest('.popup_active'))
}))
// close popup by overlay
popupList.forEach(popupItem => {
  popupItem.addEventListener('click', (e) => {
    if (e.target == e.currentTarget) {
      closePopup(popupItem)
    }
  })
})

