export class UserInfo {
  constructor(nameInputId, occupationInputId) {
    this.nameInput = document.querySelector(nameInputId)
    this.occupationInput = document.querySelector(occupationInputId)
    this.profileNameTextValue = document.querySelector('.profile__name');
    this.profileOccupationTextValue = document.querySelector('.profile__occupation');
  }
  getUserInfo() {
    return { name: this.profileNameTextValue.textContent, occupation: this.profileOccupationTextValue.textContent }
  }
  setValuesFromProfileToInputs({ name, occupation }) {
    this.nameInput.value = name;
    this.occupationInput.value = occupation;
  }
  setUserInfo({ name, occupation }) {
    this.profileNameTextValue.textContent = name
    this.profileOccupationTextValue.textContent = occupation
  }
}