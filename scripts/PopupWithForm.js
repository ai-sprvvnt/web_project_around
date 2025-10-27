// scripts/PopupWithForm.js
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /**
   * @param {string} popupSelector - selector CSS del popup (ej. '.popup_type_edit')
   * @param {(formValues: Record<string,string>, instance: PopupWithForm) => void} handleFormSubmit
   */
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector(".popup__form");
    if (!this._form) {
      throw new Error(
        "PopupWithForm: no se encontró .popup__form dentro del popup."
      );
    }

    this._inputList = Array.from(
      this._form.querySelectorAll(".popup__input, input, textarea")
    );

    // Bind para el submit
    this._onSubmit = this._onSubmit.bind(this);
  }

  /** Devuelve un objeto { [name|id]: valor } con todos los inputs del form */
  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      const key = input.name || input.id; // usa name si existe, si no id
      if (key) values[key] = input.value.trim();
    });
    return values;
  }

  /** Permite prefijar valores al abrir (útil para "Editar perfil") */
  setInputValues(data) {
    this._inputList.forEach((input) => {
      const key = input.name || input.id;
      if (key && Object.prototype.hasOwnProperty.call(data, key)) {
        input.value = data[key];
      }
    });
  }

  /** Añade listener de submit + mantiene los de X/overlay del padre */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._onSubmit);
  }

  /** Handler del submit que llama al callback con los valores */
  _onSubmit(evt) {
    evt.preventDefault();
    const values = this._getInputValues();
    this._handleFormSubmit(values, this);
  }

  /** Cierra y resetea el formulario */
  close() {
    super.close();
    this._form.reset();
  }
}
