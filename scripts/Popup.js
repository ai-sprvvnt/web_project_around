// scripts/Popup.js

export default class Popup {
  /**
   * @param {string} popupSelector - selector CSS del popup (ej. '.popup_type_edit')
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    if (!this._popup) {
      throw new Error(
        `Popup: no se encontró un elemento con el selector "${popupSelector}"`
      );
    }

    // Bind para mantener this en el listener
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  /** Abre el popup y activa cerrar con ESC */
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  /** Cierra el popup y desactiva cerrar con ESC */
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  /** Cierra con la tecla Escape */
  _handleEscClose(evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
      this.close();
    }
  }

  /**
   * Agrega listeners para:
   * - Click en el botón de cerrar (ícono X).
   * - Click en el overlay (área sombreada fuera del contenido).
   *
   * Ajusta el selector del botón según tu HTML real:
   * - común: .popup__close-button  o  .popup__close
   */
  setEventListeners() {
    // Cerrar por “X”
    const closeBtn = this._popup.querySelector(
      ".popup__close-button, .popup__close"
    );
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close());
    }

    // Cerrar por overlay
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
