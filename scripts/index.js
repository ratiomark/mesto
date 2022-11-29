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
const setDataFromCardToPopup = ({ src, title, alt }) => {
  imgPopupShowCard.src = src;
  imgPopupShowCard.alt = alt;
  descriptionPopupShowCard.textContent = title;
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

const removeCard = evt => evt.target.closest('.card').remove();
const toggleLikeState = evt => evt.target.classList.toggle('card__like-button_active');

// initial cards upload
const addInitialCard = (card, placeForCard) => placeForCard.append(card);
const createCard = (template, { name, link, alt }) => {
  const cardFromTemplate = template.content.cloneNode(true).querySelector('.card').cloneNode(true);
  const cardImage = cardFromTemplate.querySelector(".card__image");
  cardImage.src = link;
  const cardTitle = cardFromTemplate.querySelector(".card__title");
  cardTitle.textContent = name;
  cardImage.alt = alt;
  const cardDataObject = { src: link, title: name, alt: alt }
  cardFromTemplate.querySelector(".card__delete-icon").addEventListener('click', removeCard);
  cardFromTemplate.querySelector(".card__like-button").addEventListener('click', toggleLikeState);
  cardImage.addEventListener('click', () => {
    showCard(cardDataObject)
  });
  return cardFromTemplate
}

initialCards.forEach(cardData => {
  addInitialCard(createCard(templateCard, cardData), listWithCards)
});

const addNewCard = (card, placeForCard) => placeForCard.prepend(card);

//forms handlers  
const handleSubmitProfileEditForm = (evt) => {
  evt.preventDefault();
  setDataFromProfileEditToPage()
  closePopup(popupEditProfile)
}

const handleSubmitNewCard = (evt) => {
  evt.preventDefault();
  const card = createCard(templateCard, getDataForNewCardFromUserInput())
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