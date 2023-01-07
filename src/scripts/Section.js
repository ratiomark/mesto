export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this.container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach(this._renderer)
  }
  addItem(element) {
    this.container.prepend(element)
  }
}