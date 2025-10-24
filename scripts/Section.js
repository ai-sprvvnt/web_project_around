// scripts/Section.js

export default class Section {
  /**
   * @param {{ items: any[], renderer: (item:any)=>void }} params
   * @param {string} containerSelector
   */
  constructor({ items = [], renderer }, containerSelector) {
    if (typeof renderer !== "function") {
      throw new Error('Section: "renderer" debe ser una función.');
    }
    this._items = Array.isArray(items) ? items : [];
    this._renderer = renderer;

    const container = document.querySelector(containerSelector);
    if (!container) {
      throw new Error(
        `Section: no se encontró el contenedor "${containerSelector}".`
      );
    }
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  /** Agrega al final (respeta orden del array inicial) */
  addItem(element) {
    this._container.append(element);
  }

  /** Agrega al inicio (útil para nuevas tarjetas) */
  addItemAtStart(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = "";
  }
}
