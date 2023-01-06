import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  open({ link, name, alt }) {
    this._imgPopupShowCard = this.popup.querySelector('.popup__image');
    this._descriptionPopupShowCard = this.popup.querySelector('.popup__image-description');
    this._imgPopupShowCard.src = link;
    this._imgPopupShowCard.alt = alt;
    this._descriptionPopupShowCard.textContent = name;
    super.open()
  }
}