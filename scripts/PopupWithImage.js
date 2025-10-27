// scripts/PopupWithImage.js
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  /**
   * @param {string} popupSelector - selector del popup de imagen (ej. '.popup_type_image')
   */
  constructor(popupSelector) {
    super(popupSelector);

    // cachear nodos internos del popup de imagen
    this._imageEl = this._popup.querySelector(".popup__image");
    this._captionEl = this._popup.querySelector(".popup__caption");

    if (!this._imageEl || !this._captionEl) {
      throw new Error(
        "PopupWithImage: faltan .popup__image o .popup__caption dentro del popup."
      );
    }
  }

  /**
   * Sobrescribe el open() del padre para setear la imagen y su leyenda.
   * @param {string} name - texto para alt y caption
   * @param {string} link - URL de la imagen
   */
  open(name, link) {
    this._imageEl.src = link;
    this._imageEl.alt = name || "Imagen ampliada";
    this._captionEl.textContent = name || "";
    super.open();
  }
}
