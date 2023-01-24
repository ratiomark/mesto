export class Section {
  constructor({ renderer, containerSelector }) {
    this._renderer = renderer; 
    this.container = document.querySelector(containerSelector);
  }
  renderItems(itemsToRender) {
    console.log(itemsToRender)
    itemsToRender.forEach(cardObj => {
      const { name, link, likes, _id } = cardObj;
      const ownerId = cardObj.owner._id
      const obj = { name, link, likes, ownerId, _id }
      console.log(obj)
      this._renderer(obj)
    })
  }
  addItemToEnd(element) {
    this.container.append(element)
  }
  addItem(element) {
    this.container.prepend(element)
  }
}