const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__occupation');
const popupElement = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');

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