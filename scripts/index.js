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
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__occupation');
const popupElement = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__new-card-button');
const closePopupButton = document.querySelector('.popup__close-button');
const listWithCards = document.querySelector(".cards__list");
const templateCard = document.querySelector("#card-item");

// добавить лайки

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

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileOccupation.textContent = jobInput.value
  closePopup()
}

function openPopup() {
  popupElement.classList.add('popup_active')
  nameInput.value = profileName.textContent
  jobInput.value = profileOccupation.textContent
}

function closePopup() {
  popupElement.classList.remove('popup_active')
}


formElement.addEventListener('submit', formSubmitHandler)
editProfileButton.addEventListener('click', openPopup)
closePopupButton.addEventListener('click', closePopup);
newCardButton.addEventListener('click', openPopup);