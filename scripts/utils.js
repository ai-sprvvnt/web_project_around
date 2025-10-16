// scripts/utils.js

// Clase que se usa en tu CSS al abrir popups
const POPUP_OPEN_CLASS = "popup_opened";

function handleEscClose(evt) {
  if (evt.key !== "Escape") return;
  const opened = Array.from(
    document.querySelectorAll(`.popup.${POPUP_OPEN_CLASS}`)
  );
  const topmost = opened.at(-1);
  if (topmost) closePopup(topmost);
}

function handleOverlayClose(evt) {
  // cierra si el click fue en el overlay (el contenedor raíz del popup)
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

export function openPopup(popup) {
  popup.classList.add(POPUP_OPEN_CLASS);
  document.addEventListener("keydown", handleEscClose);
  popup.addEventListener("mousedown", handleOverlayClose);
}

export function closePopup(popup) {
  popup.classList.remove(POPUP_OPEN_CLASS);
  document.removeEventListener("keydown", handleEscClose);
  popup.removeEventListener("mousedown", handleOverlayClose);
}

// Conecta cierre por overlay y botón .popup__close
export function setPopupCloseHandlers(popup) {
  const closeBtn = popup.querySelector(".popup__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closePopup(popup));
  }
}
