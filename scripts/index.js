const INITIAL_CARDS = [
  {
    name: 'Spore Forest',
    link: 'https://i.pinimg.com/564x/40/4d/fa/404dfaa0aa9cdbb0ebd8e70bed2ae9ad.jpg'
  },
  {
    name: 'Lair of Behemonths',
    link: 'https://i.pinimg.com/564x/91/8a/59/918a594b039b8da22538985978149b75.jpg'
  },
  {
    name: 'The Great Tree',
    link: 'https://i.pinimg.com/564x/68/5b/cb/685bcbccbc86257753133fea7a198f6b.jpg'
  },
  {
    name: 'Mushroom Forest',
    link: 'https://i.pinimg.com/564x/0d/33/bb/0d33bb844a836176c20c0d85de7c2235.jpg'
  },
  {
    name: 'Tree Village',
    link: 'https://i.pinimg.com/564x/50/1a/60/501a607d9ad6aae8fc55857413c46556.jpg'
  },
  {
    name: 'Dark Path',
    link: 'https://i.pinimg.com/564x/14/46/8e/14468e41e4dc9c320eea11ad06cd7c3d.jpg'
  }
];

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const editProfileButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__new-card-button');
const listWithCards = document.querySelector(".cards__list");
const templateCard = document.querySelector("#card-item");


function addInitialCards(card, placeForCard) {
  placeForCard.append(card);
}

function createCard(template, { name, link }) {
  const cardFromTemplate = template.content.cloneNode(true).querySelector('.card').cloneNode(true);
  cardFromTemplate.querySelector(".card__image").src = link;
  cardFromTemplate.querySelector(".card__title").textContent = name;
  return cardFromTemplate
}

INITIAL_CARDS.forEach(element => {
  addInitialCards(createCard(templateCard, element), listWithCards)
});

function addNewCard(card, placeForCard) {
  placeForCard.prepend(card);
}

const setDataInPopupProfileEdit = function (popupEditProfile) {
  const nameInput = popupEditProfile.querySelector('.popup__name');
  const occupationInput = popupEditProfile.querySelector('.popup__occupation');
  nameInput.value = profileName.textContent
  occupationInput.value = profileOccupation.textContent
}

const setDataFromProfileEditToPage = function (popupEditProfile) {
  profileName.textContent = popupEditProfile.querySelector('.popup__name').value;
  profileOccupation.textContent = popupEditProfile.querySelector('.popup__occupation').value;
}

const getDataOfNewCard = function (popupAddNewCard) {
  const nameInput = popupAddNewCard.querySelector('.popup__name');
  const linkInput = popupAddNewCard.querySelector('.popup__link');
  return { name: nameInput.value, link: linkInput.value }
}

const clearInputsInPopup = function (popupAddNewCard) {
  popupAddNewCard.querySelectorAll('input').forEach(input => input.value = '')
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  setDataFromProfileEditToPage(popupEditProfile)
  closePopup(popupEditProfile)
}

function formSubmitNewCard(evt) {
  evt.preventDefault();
  const data = getDataOfNewCard(popupAddNewCard)
  const card = createCard(templateCard, data)
  addNewCard(card, listWithCards)
  clearInputsInPopup(popupAddNewCard)
  closePopup(popupAddNewCard)
}

function openPopup(popup) {
  popup.classList.add('popup_active')
}

function closePopup(popup) {
  popup.classList.remove('popup_active')
}



editProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  setDataInPopupProfileEdit(popupEditProfile)
  const formElement = popupEditProfile.querySelector('.popup__container');
  formElement.addEventListener('submit', formSubmitHandler)
  popupEditProfile.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(popupEditProfile)
  }, { once: true });
});

newCardButton.addEventListener('click', () => {
  openPopup(popupAddNewCard);
  const formElement = popupAddNewCard.querySelector('.popup__container');
  formElement.addEventListener('submit', formSubmitNewCard)
  popupAddNewCard.querySelector('.popup__close-button').addEventListener('click', () => {
    closePopup(popupAddNewCard)
  }, { once: true });
});

// newCardButton.addEventListener('click', openPopup);