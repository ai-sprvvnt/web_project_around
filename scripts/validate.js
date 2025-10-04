(function () {
  function showInputError(form, input, config, message) {
    const errorEl = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add(config.errorClass);
    }
  }

  function hideInputError(form, input, config) {
    const errorEl = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove(config.errorClass);
    }
  }

  function checkInputValidity(form, input, config) {
    if (!input.validity.valid) {
      // mensaje por defecto del navegador
      showInputError(form, input, config, input.validationMessage);
    } else {
      hideInputError(form, input, config);
    }
  }

  function hasInvalidInput(inputs) {
    return inputs.some((i) => !i.validity.valid);
  }

  function toggleButtonState(inputs, button, config) {
    if (!button) return;
    if (hasInvalidInput(inputs)) {
      button.disabled = true;
      button.classList.add(config.inactiveButtonClass);
    } else {
      button.disabled = false;
      button.classList.remove(config.inactiveButtonClass);
    }
  }

  function setEventListeners(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    // Estado inicial del botón
    toggleButtonState(inputs, submitButton, config);

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(form, input, config);
        toggleButtonState(inputs, submitButton, config);
      });
    });

    // Seguridad extra: impedir submit si hay inválidos
    form.addEventListener("submit", (evt) => {
      if (hasInvalidInput(inputs)) {
        evt.preventDefault();
      }
    });
  }

  function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach((form) => setEventListeners(form, config));
  }

  // Opcional: resetear errores/botón al abrir un popup
  function resetValidation(form, config) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
    inputs.forEach((input) => hideInputError(form, input, config));
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add(config.inactiveButtonClass);
    }
  }

  // Exponer en window
  window.enableValidation = enableValidation;
  window.resetValidation = resetValidation;
})();
