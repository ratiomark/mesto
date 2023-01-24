export class Section {
  constructor({ initialCardRequest, renderer, containerSelector }) {
    this._initialCardRequest = initialCardRequest;
    this._renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._initialCardRequest()
      .then(res => {
        res.forEach(cardObj => {
          const { name, link, likes, _id } = cardObj;
          const ownerId = cardObj.owner._id
          const obj = { name, link, likes, ownerId, _id }
          this._renderer(obj)
        })
      })
  }

  addItem(element) {
    this.container.prepend(element)
  }
}