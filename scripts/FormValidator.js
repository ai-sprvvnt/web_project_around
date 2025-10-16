// scripts/FormValidator.js

export default class FormValidator {
  /**
   * @param {Object} config
   * @param {HTMLFormElement} formElement
   *
   * config:
   *  - formSelector: '.popup__form'
   *  - inputSelector: '.popup__input'
   *  - submitButtonSelector: '.popup__save-button'
   *  - inactiveButtonClass: 'popup__save-button_disabled'
   *  - inputErrorClass: 'popup__input_type_error'
   *  - errorClass: 'popup__error_visible'
   */
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;
    this._inputs = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  enableValidation() {
    // Estado inicial del botón
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });

    // Seguridad extra
    this._form.addEventListener("submit", (evt) => {
      if (this._hasInvalid()) evt.preventDefault();
    });
  }

  resetValidation() {
    this._inputs.forEach((input) => this._hideInputError(input));
    // Al abrir, fuerza deshabilitado si hay inválidos (útil para "Nueva tarjeta")
    this._toggleButtonState(true);
  }

  // ======= Privados =======
  _hasInvalid() {
    return this._inputs.some((i) => !i.validity.valid);
  }

  _toggleButtonState(forceDisabled = false) {
    const shouldDisable = forceDisabled ? true : this._hasInvalid();
    if (this._button) {
      this._button.disabled = shouldDisable;
      this._button.classList.toggle(
        this._config.inactiveButtonClass,
        shouldDisable
      );
    }
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _getErrorElement(input) {
    // Prioriza convención #<id>-error (tu form de editar la usa)
    if (input.id) {
      const byId = this._form.querySelector(`#${input.id}-error`);
      if (byId) return byId;
    }
    // Fallback: buscar un .popup__error dentro de la misma etiqueta contenedora
    const label = input.closest(".popup__label");
    if (!label) return null;
    return label.querySelector(".popup__error");
  }

  _showInputError(input, message) {
    const errorEl = this._getErrorElement(input);
    input.classList.add(this._config.inputErrorClass);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add(this._config.errorClass);
    }
  }

  _hideInputError(input) {
    const errorEl = this._getErrorElement(input);
    input.classList.remove(this._config.inputErrorClass);
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove(this._config.errorClass);
    }
  }
}
