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
// popups and forms
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupShowCard = document.querySelector('.popup_type_show-card');
const formElementEditProfile = popupEditProfile.querySelector('.popup__container');
const formElementAddNewCard = popupAddNewCard.querySelector('.popup__container');
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
const openPopup = popup => popup.classList.add('popup_active');
const closePopup = popup => popup.classList.remove('popup_active');
const clearInputsInPopup = popupAddNewCard => popupAddNewCard.querySelectorAll('input').forEach(input => input.value = '');
const setDataInPopupProfileEdit = () => {
  nameInput.value = profileName.textContent
  occupationInput.value = profileOccupation.textContent
}

const setDataFromProfileEditToPage = () => {
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;
}
const setDataFromCardToPopup = ({ src, title }) => {
  imgPopupShowCard.src = src;
  descriptionPopupShowCard.textContent = title;
}
const getDataForNewCardFromUserInput = () => ({ name: nameInputNewCard.value, link: linkInputNewCard.value });
const showCard = evt => {
  setDataFromCardToPopup(getDataFromCard(evt.target))
  openPopup(popupShowCard)
}

const removeCard = evt => evt.target.closest('.card').remove();
const toggleLikeState = evt => evt.target.classList.toggle('card__like-button_active');
const getDataFromCard = target => {
  const card = target.closest('.card');
  const srcImage = card.querySelector('.card__image').src;
  const titleCard = card.querySelector('.card__title').textContent;
  return { src: srcImage, title: titleCard }
}

// initial cards upload
const addInitialCard = (card, placeForCard) => placeForCard.append(card);
const createCard = (template, { name, link }) => {
  const cardFromTemplate = template.content.cloneNode(true).querySelector('.card').cloneNode(true);
  cardFromTemplate.querySelector(".card__image").src = link;
  cardFromTemplate.querySelector(".card__title").textContent = name;
  cardFromTemplate.querySelector(".card__delete-icon").addEventListener('click', removeCard);
  cardFromTemplate.querySelector(".card__like-button").addEventListener('click', toggleLikeState);
  cardFromTemplate.querySelector(".card__image").addEventListener('click', showCard);
  return cardFromTemplate
}

initialCards.forEach(cardData => {
  addInitialCard(createCard(templateCard, cardData), listWithCards)
});

const addNewCard = (card, placeForCard) => placeForCard.prepend(card);

//forms handlers  
const formSubmitProfileEdit = (evt) => {
  evt.preventDefault();
  setDataFromProfileEditToPage()
  closePopup(popupEditProfile)
}

const formSubmitNewCard = (evt) => {
  evt.preventDefault();
  const card = createCard(templateCard, getDataForNewCardFromUserInput())
  addNewCard(card, listWithCards)
  clearInputsInPopup(popupAddNewCard)
  closePopup(popupAddNewCard)
}

const hasInvalidInputs = (inputList) => inputList.some(inputElem => !inputElem.validity.valid);
// const validateInput = (inputElem, ) => {
// validationMessage
// }
function validateForm(formElement, inputList, buttonSubmit) {
  if (hasInvalidInputs(inputList)) {
    buttonSubmit.classList.add('DISABLED')
  } else {
    buttonSubmit.classList.remove('DISABLED')
  }
}
const enableValidation = (formSelector, inputSelector, buttonSelector) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  console.log(forms)

  forms.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSubmit = formElement.querySelector(buttonSelector)
    validateForm(formElement, inputList, buttonSubmit)
    formElement.addEventListener('submit', (e) => {
      e.preventDefault()
    });
    console.log(inputList)

    inputList.forEach(inputElem => {
      inputElem.addEventListener('input', (e) => {
        // validateInput()
      });
    })
  })
}
enableValidation('.popup__form', '.input', '.popup__save-button')

// main listeners
editProfileButton.addEventListener('click', () => {
  setDataInPopupProfileEdit()
  openPopup(popupEditProfile);
});
formElementEditProfile.addEventListener('submit', formSubmitProfileEdit)
newCardButton.addEventListener('click', () => {
  openPopup(popupAddNewCard);
});
formElementAddNewCard.addEventListener('submit', formSubmitNewCard)
closeButtons.forEach(i => i.addEventListener('click', () => {
  closePopup(i.closest('.popup_active'))
}))
