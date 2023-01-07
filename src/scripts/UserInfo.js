export class UserInfo {
  constructor(inputNameSelector, inputOccupationSelector) {
    this._profileNameTextValue = document.querySelector(inputNameSelector);
    this._profileOccupationTextValue = document.querySelector(inputOccupationSelector);
  }
  getUserInfo() {
    return { name: this._profileNameTextValue.textContent, occupation: this._profileOccupationTextValue.textContent }
  }
  setUserInfo({ name, occupation }) {
    this._profileNameTextValue.textContent = name
    this._profileOccupationTextValue.textContent = occupation
  }
}