// scripts/index.js
//import { openPopup, closePopup, setPopupCloseHandlers } from "./utils.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

/* =============================
   SELECTORES
================================ */

// Selector del contenedor de tarjetas (Section lo resolverá) (selector del grid)
const cardsContainerSelector = ".elements"; //el grid vive en .elements

// Popups (elementos del DOM, renombrados con “El” = Element)
const popupEditEl = document.querySelector(".popup_type_edit");
const popupAddEl = document.querySelector(".popup_type_add");

// Crear instancias
const popupEdit = new PopupWithForm(".popup_type_edit", (values, instance) => {
  // Mapea por name o id
  const nameVal = values.name || values["profile-name-input"] || "";
  const aboutVal = values.about || values["profile-role-input"] || "";

  userInfo.setUserInfo({ name: nameVal, about: aboutVal });
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

  //Validación en este popup, lo reinicia tras cerrar.
  instance.close();
});

//const popupImage = new Popup(".popup_type_image");
const popupImage = new PopupWithImage(".popup_type_image");

// Listeners internos (X + overlay)
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

// Botones abrir popups
const editBtn = document.querySelector(".profile__edit-button");
const addOpenBtn = document.querySelector(".profile__add-button");

// Form: Editar perfil
const formEdit = popupEditEl.querySelector('form[name="edit-profile-form"]');
const inputName = formEdit.querySelector("#profile-name-input");
const inputAbout = formEdit.querySelector("#profile-role-input");

// Form: Nueva tarjeta
const formAdd = popupAddEl.querySelector('form[name="add-card-form"]');
const inputTitle = formAdd.elements["title"];
const inputLink = formAdd.elements["link"];

//Instancia con los selectores
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__role",
});

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
  popupImage.open(name, link);
}

/* ===========================================
   TARJETAS
=========================================== */
const initialCards = [
  { name: "Chichén Itzá", link: "./images/chichenitza_mex.webp" },
  { name: "Colima", link: "./images/colima_mex.webp" },
  { name: "Guadalajara", link: "./images/guadalajara_mex.webp" },
  { name: "Pirámide del Sol", link: "./images/piramide_del_sol_mex.webp" },
  { name: "Progreso", link: "./images/progreso_mex.webp" },
  { name: "Punta Perula", link: "./images/punta_perula_mex.webp" },
];

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

editBtn.addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();

  popupEdit.setInputValues({
    name,
    about,
    "profile-name-input": name,
    "profile-role-input": about,
  });

  editValidator.resetValidation();
  popupEdit.open();
  setTimeout(() => inputName.focus(), 0);
});

/* ===========================================
   POPUP: Nueva tarjeta
=========================================== */

addOpenBtn.addEventListener("click", () => {
  addValidator.resetValidation();
  popupAdd.open();
  setTimeout(() => inputTitle.focus(), 0);
});

