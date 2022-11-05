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

// popups
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupShowCard = document.querySelector('.popup_type_show-card');
// buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__new-card-button');
// other
const listWithCards = document.querySelector(".cards__list");
const templateCard = document.querySelector("#card-item");
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

// initial cards upload
const addInitialCard = (card, placeForCard) => placeForCard.append(card);
const createCard = (template, { name, link }) => {
  const cardFromTemplate = template.content.cloneNode(true).querySelector('.card').cloneNode(true);
  cardFromTemplate.querySelector(".card__image").src = link;
  cardFromTemplate.querySelector(".card__title").textContent = name;
  return cardFromTemplate
}

INITIAL_CARDS.forEach(element => {
  addInitialCard(createCard(templateCard, element), listWithCards)
});

// popup mechanics
const popupPlaceSetter = () => {
  const popup = document.querySelector('.popup_active');
  popup.style.top = `${window.pageYOffset}px`
}

const openPopup = popup => {
  popup.classList.add('popup_active', "show")
  popupPlaceSetter()
  document.addEventListener('scroll', popupPlaceSetter)
};

const closePopup = popup => {
  popup.classList.add('fade')
  popup.classList.remove('show')
  popup.addEventListener('animationend', () => {
    popup.classList.remove('popup_active', 'fade')
  }, { once: true });
  document.removeEventListener('scroll', popupPlaceSetter)
};

const setDataInPopupProfileEdit = popupEditProfile => {
  const nameInput = popupEditProfile.querySelector('.popup__name');
  const occupationInput = popupEditProfile.querySelector('.popup__occupation');
  nameInput.value = profileName.textContent
  occupationInput.value = profileOccupation.textContent
}

const setDataFromProfileEditToPage = popupEditProfile => {
  profileName.textContent = popupEditProfile.querySelector('.popup__name').value;
  profileOccupation.textContent = popupEditProfile.querySelector('.popup__occupation').value;
}

const getDataForNewCardFromUserInput = popupAddNewCard => {
  const nameInput = popupAddNewCard.querySelector('.popup__name');
  const linkInput = popupAddNewCard.querySelector('.popup__link');
  return { name: nameInput.value, link: linkInput.value }
}

const addNewCard = (card, placeForCard) => placeForCard.prepend(card);
const clearInputsInPopup = popupAddNewCard => popupAddNewCard.querySelectorAll('input').forEach(input => input.value = '');
const removeCard = target => target.closest('.card').remove();
const toggleLikeState = target => target.classList.toggle('card__like-button_active');
const checkIsLikeIcon = target => target.classList.contains('card__like-button');
const checkIsCardImage = target => target.classList.contains('card__image');
const checkIsDeleteCardIcon = target => target.classList.contains('card__delete-icon');

// functions for popup that shows card image and title
const getDataFromCard = target => {
  const card = target.closest('.card');
  const srcImage = card.querySelector('.card__image').src;
  const titleCard = card.querySelector('.card__title').textContent;
  return { src: srcImage, title: titleCard }
}

const setDataFromCardToPopup = ({ src, title }) => {
  popupShowCard.querySelector('.popup__image').src = src;
  popupShowCard.querySelector('.popup__image-description').textContent = title;
}

//forms handlers  
const formSubmitProfileEdit = evt => {
  evt.preventDefault();
  setDataFromProfileEditToPage(popupEditProfile)
  closePopup(popupEditProfile)
}

const formSubmitNewCard = evt => {
  evt.preventDefault();
  const dataForNewCardFromUserInput = getDataForNewCardFromUserInput(popupAddNewCard)
  const card = createCard(templateCard, dataForNewCardFromUserInput)
  addNewCard(card, listWithCards)
  clearInputsInPopup(popupAddNewCard)
  closePopup(popupAddNewCard)
}

// main listeners
editProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  setDataInPopupProfileEdit(popupEditProfile)
  const formElement = popupEditProfile.querySelector('.popup__container');
  formElement.addEventListener('submit', formSubmitProfileEdit)
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

listWithCards.addEventListener('click', (evt) => {
  const target = evt.target;
  if (checkIsDeleteCardIcon(target)) {
    removeCard(target)
  } else if (checkIsLikeIcon(target)) {
    toggleLikeState(target)
  } else if (checkIsCardImage(target)) {
    const dataFromCard = getDataFromCard(target)
    setDataFromCardToPopup(dataFromCard)
    openPopup(popupShowCard)
    popupShowCard.querySelector('.popup__close-button').addEventListener('click', () => closePopup(popupShowCard), { once: true })
  }
});