// scripts/index.js
import { openPopup, closePopup, setPopupCloseHandlers } from "./utils.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

/* =============================
   SELECTORES
================================ */
// Contenedor de tarjetas (tu <section class="elements">)
const cardsContainer = document.querySelector(".elements");

// Popups
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector(".popup_type_image");

// Cerrar por botón X / overlay / ESC
[popupEdit, popupAdd, popupImage].forEach((p) => setPopupCloseHandlers(p));

// Botones abrir popups
const editBtn = document.querySelector(".profile__edit-button");
const addOpenBtn = document.querySelector(".profile__add-button");

// Perfil
const profileNameEl = document.querySelector(".profile__name");
const profileRoleEl = document.querySelector(".profile__role");

// Form: Editar perfil
const formEdit = popupEdit.querySelector('form[name="edit-profile-form"]');
const inputName = formEdit.querySelector("#profile-name-input");
const inputAbout = formEdit.querySelector("#profile-role-input");

// Form: Nueva tarjeta
const formAdd = popupAdd.querySelector('form[name="add-card-form"]');
const inputTitle = formAdd.elements["title"];
const inputLink = formAdd.elements["link"];

// Popup imagen (vista previa)
const popupImg = popupImage.querySelector(".popup__image");
const popupCap = popupImage.querySelector(".popup__caption");

// Config validación (tus nombres reales)
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Instancias de validación (una por form)
const editValidator = new FormValidator(validationConfig, formEdit);
const addValidator = new FormValidator(validationConfig, formAdd);
editValidator.enableValidation();
addValidator.enableValidation();

/* ===========================================
   HANDLERS COMUNES
=========================================== */
function handleImageClick(name, link) {
  popupImg.src = link;
  popupImg.alt = name || "Imagen ampliada";
  popupCap.textContent = name || "";
  openPopup(popupImage);
}

/* ===========================================
   TARJETAS
=========================================== */

// Render desde datos (usa tu template #card-template)
function renderCard({ name, link }, { addToStart = false } = {}) {
  const card = new Card({ name, link }, "#card-template", { handleImageClick });
  const el = card.getView();
  if (addToStart) cardsContainer.prepend(el);
  else cardsContainer.append(el);
}

const initialCards = [
  { name: "Chichén Itzá", link: "./images/chichenitza_mex.webp" },
  { name: "Colima", link: "./images/colima_mex.webp" },
  { name: "Guadalajara", link: "./images/guadalajara_mex.webp" },
  { name: "Pirámide del Sol", link: "./images/piramide_del_sol_mex.webp" },
  { name: "Progreso", link: "./images/progreso_mex.webp" },
  { name: "Punta Perula", link: "./images/punta_perula_mex.webp" },
];

initialCards.forEach((item) => {
  const card = new Card(item, "#card-template", { handleImageClick });
  document.querySelector(".elements").append(card.getView());
});

/* ===========================================
   POPUP: Editar perfil
=========================================== */
editBtn.addEventListener("click", () => {
  inputName.value = profileNameEl.textContent.trim();
  inputAbout.value = profileRoleEl.textContent.trim();
  editValidator.resetValidation();
  openPopup(popupEdit);
  setTimeout(() => inputName.focus(), 0);
});

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  profileNameEl.textContent = inputName.value.trim();
  profileRoleEl.textContent = inputAbout.value.trim();
  closePopup(popupEdit);
});

/* ===========================================
   POPUP: Nueva tarjeta
=========================================== */
addOpenBtn.addEventListener("click", () => {
  formAdd.reset();
  addValidator.resetValidation();
  openPopup(popupAdd);
  setTimeout(() => inputTitle.focus(), 0);
});

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputTitle.value.trim();
  const link = inputLink.value.trim();
  renderCard({ name, link }, { addToStart: true });
  formAdd.reset();
  addValidator.resetValidation();
  closePopup(popupAdd);
});
