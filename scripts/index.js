const INITIAL_CARDS = [
  {
    title: 'Spore Forest',
    link: 'https://i.pinimg.com/564x/40/4d/fa/404dfaa0aa9cdbb0ebd8e70bed2ae9ad.jpg',
    alt: 'Image of Spore Forest'
  },
  {
    title: 'Lair of BehemonthsLair of Behemonths',
    link: 'https://i.pinimg.com/564x/91/8a/59/918a594b039b8da22538985978149b75.jpg',
    alt: 'Image of Lair of BehemonthsLair of Behemonths'
  },
  {
    title: 'The Great Tree',
    link: 'https://i.pinimg.com/564x/68/5b/cb/685bcbccbc86257753133fea7a198f6b.jpg',
    alt: 'Image of The Great Tree'
  },
  {
    title: 'Mushroom Forest',
    link: 'https://i.pinimg.com/564x/0d/33/bb/0d33bb844a836176c20c0d85de7c2235.jpg',
    alt: 'Image of Mushroom Forest'
  },
  {
    title: 'Tree Village',
    link: 'https://i.pinimg.com/564x/50/1a/60/501a607d9ad6aae8fc55857413c46556.jpg',
    alt: 'Image of Tree Village'
  },
  {
    title: 'Dark Path',
    link: 'https://i.pinimg.com/564x/14/46/8e/14468e41e4dc9c320eea11ad06cd7c3d.jpg',
    alt: 'Image of Dark Path'
  }
];

const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => addDataToCards(card, INITIAL_CARDS[index]))

function addDataToCards(cardFromPage, dataForCard) {
  cardFromPage.querySelector('.card__image').src = dataForCard['link'];
  cardFromPage.querySelector('.card__title').textContent = dataForCard['title'];
  cardFromPage.alt = dataForCard['alt']
}

const likeButtons = document.querySelectorAll('.card__like-button');
likeButtons.forEach((i) => i.addEventListener('click', pressLike));
function pressLike(event) {
  event.target.classList.toggle('card__like-button_active')
}

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__occupation');

formElement.addEventListener('submit', formSubmitHandler)
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileOccupation.textContent = jobInput.value
}

const popupElement = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', openPopup)
function openPopup() {
  popupElement.classList.add('popup_active')
  nameInput.value = profileName.textContent
  jobInput.value = profileOccupation.textContent
}

const closePopupButton = document.querySelector('.popup__close-button');
closePopupButton.addEventListener('click', closePopup);
function closePopup() {
  popupElement.classList.remove('popup_active')
}

