// scripts/index.js
// ============================
//  IMPORTS (módulos ES6)
// ============================
//import { openPopup, closePopup, setPopupCloseHandlers } from "./utils.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

// ============================
//  CONFIGURACIÓN / SELECTORES
// ============================

// Selector del contenedor de tarjetas (el grid vive en .elements)
const cardsContainerSelector = ".elements"; //el grid vive en .elements
const cardTemplateSelector = "#card-template"; // plantilla de la tarjeta

// Configuración de validación de formularios
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// ============================
//  INSTANCIA DE API
// ============================

// INSTANCIA DE API
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "9fb40c50-b585-4b13-8a35-7fd3bf5d90ff",
    "Content-Type": "application/json",
  },
});

// ============================
//  ELEMENTOS DEL DOM
// ============================

// Popups (elementos del DOM, renombrados con “El” = Element)
const popupEditEl = document.querySelector(".popup_type_edit");
const popupAddEl = document.querySelector(".popup_type_add");
const popupAvatarEl = document.querySelector(".popup_type_avatar");

// Botones que abren los popups
const editBtn = document.querySelector(".profile__edit-button");
const addOpenBtn = document.querySelector(".profile__add-button");
const avatarEditBtn = document.querySelector(".profile__avatar-edit-button");

// Form: Editar perfil
const formEdit = popupEditEl.querySelector('form[name="edit-profile-form"]');
const inputName = formEdit.querySelector("#profile-name-input");
const inputAbout = formEdit.querySelector("#profile-role-input");

// Form: Nueva tarjeta
const formAdd = popupAddEl.querySelector('form[name="add-card-form"]');
const inputTitle = formAdd.elements["title"];
const inputLink = formAdd.elements["link"];

//   Popup: cambiar avatar
const formAvatar = popupAvatarEl.querySelector('form[name="edit-avatar-form"]');
const inputAvatar = formAvatar.elements["avatar"];

// ============================
//  INSTANCIAS PRINCIPALES
// ============================

// Información del usuario (perfil)
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__role",
  avatarSelector: ".profile__avatar",
});

//const popupImage = new Popup(".popup_type_image");
const popupImage = new PopupWithImage(".popup_type_image");

// Popup de confirmación de borrado
const popupConfirmDelete = new PopupWithConfirmation(".popup_type_delete");

// Abrir vista previa desde Card
function handleImageClick(name, link) {
  popupImage.open(name, link);
}

// Helper para crear la tarjeta (para reutilizar lógica)
function createCardElement(cardData) {
  const card = new Card(cardData, cardTemplateSelector, {
    handleImageClick,
    handleDeleteClick: (cardInstance) => {
      popupConfirmDelete.setSubmitAction(() => {
        const cardId = cardInstance.getId();

        api
          .deleteCard(cardId)
          .then(() => {
            cardInstance.removeCard();
            popupConfirmDelete.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });

      popupConfirmDelete.open();
    },

    // Manejar likes con la API
    handleLikeClick: (cardInstance) => {
      const cardId = cardInstance.getId();
      const currentlyLiked = cardInstance.isLiked();

      // Elegimos PUT o DELETE según el estado actual
      const likeRequest = currentlyLiked
        ? api.removeLike(cardId) // si ya está likeada, quitamos el like
        : api.addLike(cardId); // si no, lo añadimos

      likeRequest
        .then((updatedCardData) => {
          // Sincronizar el estado visual con la respuesta de la API
          cardInstance.setIsLiked(updatedCardData.isLiked);
        })
        .catch((err) => {
          console.log(err);
          // Si hay error, no cambiamos nada en la UI
        });
    },
  });

  return card.getView();
}

// Instancia de Section: define cómo crear cada tarjeta (renderer)
const cardsSection = new Section(
  {
    items: [], // antes: initialCards (ya no existe)
    renderer: (data) => {
      const cardElement = createCardElement(data);
      cardsSection.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

// ============================
//  POPUPS CON FORMULARIO
// ============================

// Popup: Editar perfil
// Guarda los cambios en el servidor con PATCH /users/me

const popupEdit = new PopupWithForm(".popup_type_edit", (values, instance) => {
  // Obtener los valores del formulario (mapeo flexible)
  const nameVal = values.name || values["profile-name-input"] || "";
  const aboutVal = values.about || values["profile-role-input"] || "";

  // Llamar a la API para actualizar el perfil
  api
    .updateUserInfo({
      name: nameVal.trim(),
      about: aboutVal.trim(),
    })
    .then((updatedUser) => {
      // Si el servidor responde OK, actualizamos el DOM
      userInfo.setUserInfo({
        name: updatedUser.name,
        about: updatedUser.about,
      });

      // ( userInfo.setAvatar(updatedUser.avatar); )

      // Cerramos el popup solo si la petición fue exitosa
      instance.close();
    })
    .catch((err) => {
      // Requisito mínimo: mostrar el error en consola
      console.log(err);
    });
});

// ============================
//  POPUP: Nueva tarjeta
//  Guarda la nueva tarjeta en el servidor con POST /cards
// ============================

const popupAdd = new PopupWithForm(".popup_type_add", (values, instance) => {
  const title =
    values.title || values["card-title"] || values["title-input"] || "";
  const link = values.link || values["card-link"] || values["link-input"] || "";

  const nameTrimmed = title.trim();
  const linkTrimmed = link.trim();

  // Enviar la nueva tarjeta al servidor
  api
    .addCard({
      name: nameTrimmed,
      link: linkTrimmed,
    })
    // Nueva tarjeta
    .then((newCardData) => {
      const cardElement = createCardElement(newCardData);
      cardsSection.addItemAtStart(cardElement);
      instance.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

// ============================
//  POPUP: Cambiar avatar (PATCH /users/me/avatar)
// ============================

const popupAvatar = new PopupWithForm(
  ".popup_type_avatar",
  (values, instance) => {
    const avatarUrl = values.avatar || values["avatar-link-input"] || "";

    api
      .updateAvatar({ avatar: avatarUrl.trim() })
      .then((updatedUser) => {
        userInfo.setAvatar(updatedUser.avatar);
        instance.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

// ============================
//  LISTENERS INTERNOS DE POPUPS
// ============================
// Listeners internos (X + overlay)
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();
popupConfirmDelete.setEventListeners();
popupAvatar.setEventListeners();

// ============================
//  VALIDACIÓN DE FORMULARIOS
// ============================
// Instancias de validación (una por form)
const editValidator = new FormValidator(validationConfig, formEdit);
const addValidator = new FormValidator(validationConfig, formAdd);
const avatarValidator = new FormValidator(validationConfig, formAvatar);
editValidator.enableValidation();
addValidator.enableValidation();
avatarValidator.enableValidation();

// ============================
//  EVENTOS: Abrir popups
// ============================

//===========================================
//   POPUP: Editar perfil
//===========================================

editBtn.addEventListener("click", () => {
  // Rellenar el formulario con los datos actuales del usuario
  const { name, about } = userInfo.getUserInfo();

  popupEdit.setInputValues({
    name,
    about,
    "profile-name-input": name,
    "profile-role-input": about,
  });

  // Resetear la validación antes de abrir
  editValidator.resetValidation();

  popupEdit.open();

  // Enfocar el input después de abrir
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

// Abrir popup de editar avatar
avatarEditBtn.addEventListener("click", () => {
  avatarValidator.resetValidation();
  formAvatar.reset(); // opcional: limpiar el campo
  popupAvatar.open();
  setTimeout(() => inputAvatar.focus(), 0);
});

// ============================
//  CARGA INICIAL DESDE EL SERVIDOR
// ============================
// Requisito: en Api.js debe existir getAppInfo() que haga:
// return Promise.all([this.getUserInfo(), this.getInitialCards()]);

api
  .getAppInfo()
  .then(([userData, cardsData]) => {
    console.log("userData desde API:", userData); //PARA PRUEBAS COMENTAR AL FINAL
    console.log("cardsData desde API:", cardsData); //PARA PRUEBAS COMENTAR AL FINAL

    // Actualizar perfil con datos del servidor
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });

    if (userData.avatar) {
      userInfo.setAvatar(userData.avatar);
    }

    // Renderizar tarjetas obtenidas del servidor
    // Por ahora asumimos que cada cardData tiene al menos { name, link }
    // Carga inicial
    cardsData.forEach((cardData) => {
      const cardElement = createCardElement(cardData);
      cardsSection.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// //Instancia con los selectores
// const userInfo = new UserInfo({
//   nameSelector: ".profile__name",
//   aboutSelector: ".profile__role",
// });

// /* ===========================================
//    HANDLERS COMUNES
// =========================================== */

// /* ===========================================
//    TARJETAS
// =========================================== */
// const initialCards = [
//   { name: "Chichén Itzá", link: "./images/chichenitza_mex.webp" },
//   { name: "Colima", link: "./images/colima_mex.webp" },
//   { name: "Guadalajara", link: "./images/guadalajara_mex.webp" },
//   { name: "Pirámide del Sol", link: "./images/piramide_del_sol_mex.webp" },
//   { name: "Progreso", link: "./images/progreso_mex.webp" },
//   { name: "Punta Perula", link: "./images/punta_perula_mex.webp" },
// ];

// // Render inicial de todas las tarjetas
// cardsSection.renderItems();
