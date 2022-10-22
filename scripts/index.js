const editProfileButton = document.querySelector(".button_profile_edit");
const profileEditPopUp = document.querySelector('.popup-profile-edit');
const closePopUpButton = document.querySelectorAll(".button_popup_close");
const nameFromProfile = document.querySelector(".profile__name");
const jobFromProfile = document.querySelector(".profile__about");
const nameInput = document.getElementById("name-edit_input_id");
const jobInput = document.getElementById("about-edit_input_id");
const cardSection = document.querySelector('.section.cards.section.content__section');
const addCardButton = document.querySelector('.button_profile_add');
const AddNewCardPopUp = document.querySelector('.popup_card-add');
const nameOfPlaceInput = document.querySelector('#name-card_input_id');
const linkOfImageInput = document.querySelector('#link-card_input_id');
const fullScreenCardPopUp = document.querySelector('.popup_card-fullscreen ');

const initialCards = [
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
function fillCardWithNameAndLink(nameOfPlace, linkImage) {
  const cardTemplate = document.querySelector('#card').content;
  const cardImage = cardTemplate.querySelector(".card").cloneNode(true);
  cardImage.querySelector(".card__image").src = linkImage;
  cardImage.querySelector(".card__title").textContent = nameOfPlace;
  cardSection.prepend(cardImage);
}
initialCards.forEach((card) => fillCardWithNameAndLink(card['name'], card['link']));

const openPopUp = (elementToShow) => elementToShow.classList.add('popup_opened');

function closePopUp(evt) {
  elementToClose = evt.target.parentElement.parentElement;
  elementToClose.classList.remove('popup_opened');
}
closePopUpButton.forEach((i) => i.addEventListener("click", closePopUp));

function openEditProfile() {
  openPopUp(profileEditPopUp);
  nameInput.value = nameFromProfile.innerText;
  jobInput.value = jobFromProfile.innerText;
}
editProfileButton.addEventListener('click', openEditProfile);

function submitProfileData(event) {
  event.preventDefault();
  nameFromProfile.textContent = nameInput.value;
  jobFromProfile.textContent = jobInput.value;
  closePopUp(event);
}
profileEditPopUp.addEventListener('submit', submitProfileData);

const imagesOfCard = document.querySelectorAll('.card__image');
function openCardFullScrin(imageLink, titleOfCard) {
  fullScreenCardPopUp.querySelector(".popup__image").src = imageLink;
  fullScreenCardPopUp.querySelector(".popup__title").textContent = titleOfCard;
  fullScreenCardPopUp.classList.add('popup_opened');
}
function getDataFromCardWhenPressOnImage(event) {
  linkImageCard = event.target.parentElement.querySelector("img").src;
  titleCard = event.target.parentElement.querySelector("h2").textContent;
  openCardFullScrin(linkImageCard, titleCard);
}
imagesOfCard.forEach((i) => i.addEventListener('click', getDataFromCardWhenPressOnImage));

const likeButtons = document.querySelectorAll('.button_like');
function switchLike(event) {
  if (event.target.getAttribute('style') == `background-image: url("./images/like_active.svg");`) {
    event.target.setAttribute("style", `background-image: url("./images/like_disabled.svg");`);
    return
  }
  event.target.setAttribute("style", `background-image: url("./images/like_active.svg");`);
}
likeButtons.forEach((i) => i.addEventListener('click', switchLike));

const deleteButtons = document.querySelectorAll(".button_card_delete");
const deleteCardByPressButton = (event) => event.target.parentElement.remove();
deleteButtons.forEach((button) => button.addEventListener('click', deleteCardByPressButton));

const openAddNewCardPopUp = () => openPopUp(AddNewCardPopUp)
addCardButton.addEventListener('click', openAddNewCardPopUp)
function addFunctionalityButtonsAndPopUpForNewCard(event) {
  cardSection.querySelector(".button_card_delete").addEventListener('click', deleteCardByPressButton);
  cardSection.querySelector(".button_like").addEventListener('click', switchLike);
  cardSection.querySelector('.card__image').addEventListener('click', getDataFromCardWhenPressOnImage);
}
function addNewCard(event) {
  event.preventDefault();
  fillCardWithNameAndLink(nameOfPlaceInput.value, linkOfImageInput.value);
  closePopUp(event);
  addFunctionalityButtonsAndPopUpForNewCard(event);
  nameOfPlaceInput.value = '';
  linkOfImageInput.value = '';
}
AddNewCardPopUp.addEventListener('submit', addNewCard);