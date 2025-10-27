// scripts/index.js
//import { openPopup, closePopup, setPopupCloseHandlers } from "./utils.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";

/* =============================
   SELECTORES
================================ */
// Contenedor de tarjetas (tu <section class="elements">)
//const cardsContainer = document.querySelector(".elements");

// Selector del contenedor de tarjetas (Section lo resolverá) (selector del grid)
const cardsContainerSelector = ".elements"; //el grid vive en .elements

// Popups
/*const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector(".popup_type_image");*/

// Popups (elementos del DOM, renombrados con “El” = Element)
const popupEditEl = document.querySelector(".popup_type_edit");
const popupAddEl = document.querySelector(".popup_type_add");
//const popupImageEl = document.querySelector(".popup_type_image");

// Crear instancias
/*const popupEdit = new Popup(".popup_type_edit");
const popupAdd = new Popup(".popup_type_add");*/

const popupEdit = new PopupWithForm(".popup_type_edit", (values, instance) => {
  // Mapea por name o id
  const nameVal =
    values.name || values["profile-name-input"] || values["profile_name"] || "";
  const aboutVal =
    values.about ||
    values["profile-role-input"] ||
    values["profile_role"] ||
    "";

  profileNameEl.textContent = nameVal.trim();
  profileRoleEl.textContent = aboutVal.trim();
  instance.close();
});

const popupAdd = new PopupWithForm(".popup_type_add", (values, instance) => {
  const title =
    values.title || values["card-title"] || values["title-input"] || "";
  const link = values.link || values["card-link"] || values["link-input"] || "";
  const card = new Card(
    { name: title.trim(), link: link.trim() },
    "#card-template",
    { handleImageClick }
  );
  const el = card.getView();
  cardsSection.addItemAtStart(el); // nuevas arriba

  // Si usas validación en este popup, lo reiniciamos tras cerrar.
  instance.close();
});

//const popupImage = new Popup(".popup_type_image");
const popupImage = new PopupWithImage(".popup_type_image");

// Listeners internos (X + overlay)
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

// Cerrar por botón X / overlay / ESC
//[popupEdit, popupAdd, popupImage].forEach((p) => setPopupCloseHandlers(p));

// Botones abrir popups
const editBtn = document.querySelector(".profile__edit-button");
const addOpenBtn = document.querySelector(".profile__add-button");

// Perfil
const profileNameEl = document.querySelector(".profile__name");
const profileRoleEl = document.querySelector(".profile__role");

// Form: Editar perfil
const formEdit = popupEditEl.querySelector('form[name="edit-profile-form"]');
const inputName = formEdit.querySelector("#profile-name-input");
const inputAbout = formEdit.querySelector("#profile-role-input");

// Form: Nueva tarjeta
const formAdd = popupAddEl.querySelector('form[name="add-card-form"]');
const inputTitle = formAdd.elements["title"];
const inputLink = formAdd.elements["link"];

// Popup imagen (vista previa)
/*const popupImg = popupImage.querySelector(".popup__image");
const popupCap = popupImage.querySelector(".popup__caption");*/

/*const popupImg = popupImageEl.querySelector(".popup__image");
const popupCap = popupImageEl.querySelector(".popup__caption");*/

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
// Abrir vista previa desde Card
function handleImageClick(name, link) {
  /*popupImg.src = link;
  popupImg.alt = name || "Imagen ampliada";
  popupCap.textContent = name || "";
  openPopup(popupImage);*/
  /*popupImg.src = link;
  popupImg.alt = name || "Imagen ampliada";
  popupCap.textContent = name || "";
  popupImage.open();*/
  popupImage.open(name, link);
}

/* ===========================================
   TARJETAS
=========================================== */

// Render desde datos (usa tu template #card-template)
/*function renderCard({ name, link }, { addToStart = false } = {}) {
  const card = new Card({ name, link }, "#card-template", { handleImageClick });
  const el = card.getView();
  if (addToStart) cardsContainer.prepend(el);
  else cardsContainer.append(el);
}*/

const initialCards = [
  { name: "Chichén Itzá", link: "./images/chichenitza_mex.webp" },
  { name: "Colima", link: "./images/colima_mex.webp" },
  { name: "Guadalajara", link: "./images/guadalajara_mex.webp" },
  { name: "Pirámide del Sol", link: "./images/piramide_del_sol_mex.webp" },
  { name: "Progreso", link: "./images/progreso_mex.webp" },
  { name: "Punta Perula", link: "./images/punta_perula_mex.webp" },
];

/*initialCards.forEach((item) => {
  const card = new Card(item, "#card-template", { handleImageClick });
  document.querySelector(".elements").append(card.getView());
});*/

// Instancia de Section: define cómo crear cada tarjeta (renderer)
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, "#card-template", { handleImageClick });
      const el = card.getView();
      cardsSection.addItem(el); // respeta el orden de initialCards
    },
  },
  cardsContainerSelector
);

// Render inicial de todas las tarjetas
cardsSection.renderItems();

/* ===========================================
   POPUP: Editar perfil
=========================================== */

// Abrir “Editar perfil”
//const editBtn = document.querySelector(".profile__edit-button");
editBtn.addEventListener("click", () => {
  /*inputName.value = profileNameEl.textContent.trim();
  inputAbout.value = profileRoleEl.textContent.trim();*/

  // Prefill usando setInputValues; acepta keys por name o id
  popupEdit.setInputValues({
    name: profileNameEl.textContent.trim(),
    about: profileRoleEl.textContent.trim(),
    "profile-name-input": profileNameEl.textContent.trim(),
    "profile-role-input": profileRoleEl.textContent.trim(),
  });

  editValidator.resetValidation();
  //openPopup(popupEdit);
  popupEdit.open();
  setTimeout(() => inputName.focus(), 0);
});

// Guardar “Editar perfil”
/*formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  profileNameEl.textContent = inputName.value.trim();
  profileRoleEl.textContent = inputAbout.value.trim();
  //closePopup(popupEdit);
  popupEdit.close();
});*/

/* ===========================================
   POPUP: Nueva tarjeta
=========================================== */
// Abrir “Nueva tarjeta”
//const addOpenBtn = document.querySelector(".profile__add-button");
addOpenBtn.addEventListener("click", () => {
  //formAdd.reset();
  addValidator.resetValidation();
  //openPopup(popupAdd);
  popupAdd.open();
  setTimeout(() => inputTitle.focus(), 0);
});

// Guardar “Nueva tarjeta”
/*formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputTitle.value.trim();
  const link = inputLink.value.trim();
  //renderCard({ name, link }, { addToStart: true });
  const card = new Card({ name, link }, "#card-template", { handleImageClick }); //Nuevo sprint 11
  const el = card.getView(); //Nuevo sprint 11

  // nuevas al inicio
  cardsSection.addItemAtStart(el); //Nuevo sprint 11

  formAdd.reset();
  addValidator.resetValidation();
  //closePopup(popupAdd);
  popupAdd.close();
});*/
