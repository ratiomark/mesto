import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popup = document.querySelector(popupSelector);
    this._imgPopupShowCard = this._popup.querySelector('.popup__image');
    this._descriptionPopupShowCard = this._popup.querySelector('.popup__image-description');
  }
  open({ link, name, alt }) {
    this._imgPopupShowCard.src = link;
    this._imgPopupShowCard.alt = alt;
    this._descriptionPopupShowCard.textContent = name;
    super.open()
  }
}