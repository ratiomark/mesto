export class UserInfo {
  constructor({ inputNameSelector, inputOccupationSelector, profileAvatarImageSelector }) {
    this._profileNameTextValue = document.querySelector(inputNameSelector);
    this._profileOccupationTextValue = document.querySelector(inputOccupationSelector);
    this._profileAvatarImage = document.querySelector(profileAvatarImageSelector);
  }
  getUserInfo() {
    return { name: this._profileNameTextValue.textContent, about: this._profileOccupationTextValue.textContent }
  }
  setUserInfo({ name, about }) {
    this._profileNameTextValue.textContent = name
    this._profileOccupationTextValue.textContent = about
  }
  setUserImage({ avatar }) {
    this._profileAvatarImage.src = avatar
  }
  makeInitialUploadData({ name, about, avatar }) {
    this.setUserInfo({ name, about })
    this.setUserImage({ avatar })
  }
}