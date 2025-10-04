// Like / Unlike
/*document.addEventListener("click", (e) => {
  const btn = e.target.closest(".card__like");
  if (!btn) return;
  const img = btn.querySelector(".card__like-icon");
  const liked = btn.classList.toggle("card__like_active");
  btn.setAttribute("aria-pressed", liked ? "true" : "false");
  if (img) {
    img.src = liked
      ? "./images/heart_filled_vector.svg"
      : "./images/heart_vector.svg";
  }
});*/

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".card__like");
  if (!btn) return;

  const img = btn.querySelector(".card__like-icon");
  const isActive = btn.classList.toggle("card__like_active");
  btn.setAttribute("aria-pressed", isActive ? "true" : "false");

  if (img) {
    img.src = isActive
      ? "./images/heart_filled_vector.svg"
      : "./images/heart_vector.svg";
  }
});

/* teclado: espacio/enter también activan el like */
document.addEventListener("keydown", (e) => {
  if ((e.key === " " || e.key === "Enter") && e.target.matches(".card__like")) {
    e.preventDefault();
    e.target.click();
  }
});

/* ========= Popup Editar Perfil ========= */
const popupEdit = document.querySelector(".popup_type_edit");
const formEdit = popupEdit.querySelector(".popup__form");
const inputName = popupEdit.querySelector("#profile-name-input");
const inputAbout = popupEdit.querySelector("#profile-role-input");

const profileNameEl = document.querySelector(".profile__name");
const profileRoleEl = document.querySelector(".profile__role");
const editBtn = document.querySelector(".profile__edit-button");
const closeBtn = popupEdit.querySelector(".popup__close");

// ====== Datos iniciales (tarjetas actuales) ======
const initialCards = [
  { name: "Chichén Itzá", link: "./images/chichenitza_mex.webp" },
  { name: "Colima", link: "./images/colima_mex.webp" },
  { name: "Guadalajara", link: "./images/guadalajara_mex.webp" },
  { name: "Pirámide del Sol", link: "./images/piramide_del_sol_mex.webp" },
  { name: "Progreso", link: "./images/progreso_mex.webp" },
  { name: "Punta Perula", link: "./images/punta_perula_mex.webp" },
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Iniciar validación global
enableValidation(validationConfig);

/* helpers */
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);

  // --- limpiar validación al abrir si hay formulario ---
  const form = popup.querySelector(validationConfig.formSelector);
  if (form && typeof resetValidation === "function") {
    resetValidation(form, validationConfig);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(e) {
  if (e.key === "Escape") {
    const opened = document.querySelector(".popup.popup_opened");
    if (opened) closePopup(opened);
  }
}

/* abrir: precargar valores del perfil */
editBtn.addEventListener("click", () => {
  inputName.value = profileNameEl.textContent.trim();
  inputAbout.value = profileRoleEl.textContent.trim();
  openPopup(popupEdit);
  setTimeout(() => inputName.focus(), 0);
});

/* cerrar: botón X y click en overlay */
closeBtn.addEventListener("click", () => closePopup(popupEdit));
popupEdit.addEventListener("mousedown", (e) => {
  if (e.target === popupEdit) closePopup(popupEdit); // click en overlay
});

/* guardar cambios */
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  profileNameEl.textContent = inputName.value.trim();
  profileRoleEl.textContent = inputAbout.value.trim();
  closePopup(popupEdit);
});

// ====== Selectores de galería y template ======
const gallery = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;

// Crea un nodo de tarjeta desde el template
function createCard({ name, link }) {
  const node = cardTemplate.cloneNode(true);
  const card = node.querySelector(".card");
  const img = node.querySelector(".card__image");
  const title = node.querySelector(".card__title");
  img.src = link;
  img.alt = name;
  title.textContent = name;
  return node;
}

// Render inicial (recomendación del asesor)
function cardsInitials() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item);
    gallery.append(cardElement);
  });
}
//cardsInitials();

// Eliminar tarjeta (delegación)
document.addEventListener("click", (e) => {
  const del = e.target.closest(".card__delete");
  if (!del) return;
  const card = del.closest(".card");
  if (card) card.remove();
});

/* ========= Popup Nueva Tarjeta ========= */
const popupAdd = document.querySelector(".popup_type_add");
const formAdd = popupAdd?.querySelector('form[name="add-card-form"]');
const addOpenBtn = document.querySelector(".profile__add-button");
const addCloseBtn = popupAdd?.querySelector(".popup__close");
const inputTitle = formAdd?.elements["title"];
const inputLink = formAdd?.elements["link"];

// Abrir popup (botón +)
addOpenBtn?.addEventListener("click", () => {
  formAdd?.reset();
  openPopup(popupAdd);
  setTimeout(() => inputTitle?.focus(), 0);
});

// Cerrar por botón X y por overlay
addCloseBtn?.addEventListener("click", () => closePopup(popupAdd));
popupAdd?.addEventListener("mousedown", (e) => {
  if (e.target === popupAdd) closePopup(popupAdd);
});

// Crear y prepend tarjeta nueva
formAdd?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputTitle.value.trim();
  const link = inputLink.value.trim();
  const cardElement = createCard({ name, link });
  gallery.prepend(cardElement);
  formAdd.reset();
  closePopup(popupAdd);
});

/* abrir: precargar valores del perfil */
editBtn.addEventListener("click", () => {
  inputName.value = profileNameEl.textContent.trim();
  inputAbout.value = profileRoleEl.textContent.trim();
  openPopup(popupEdit);
  setTimeout(() => inputName.focus(), 0);
});

/* cerrar: botón X y click en overlay */
closeBtn.addEventListener("click", () => closePopup(popupEdit));
popupEdit.addEventListener("mousedown", (e) => {
  if (e.target === popupEdit) closePopup(popupEdit); // click en overlay
});

/* guardar cambios */
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  profileNameEl.textContent = inputName.value.trim();
  profileRoleEl.textContent = inputAbout.value.trim();
  closePopup(popupEdit);
});

// ====== Popup de imagen ampliada ======
const popupImage = document.querySelector(".popup_type_image");
const popupImg = popupImage.querySelector(".popup__image");
const popupCap = popupImage.querySelector(".popup__caption");
const popupImgClose = popupImage.querySelector(".popup__close");

// Abrir al hacer clic en una imagen de tarjeta (delegación sobre la galería)
gallery.addEventListener("click", (e) => {
  const img = e.target.closest(".card__image");
  if (!img) return;
  // caption = alt o título de la tarjeta
  const title =
    img.alt ||
    img.closest(".card")?.querySelector(".card__title")?.textContent?.trim() ||
    "";
  popupImg.src = img.src;
  popupImg.alt = title || "Imagen ampliada";
  popupCap.textContent = title;
  openPopup(popupImage);
});

// Cerrar (botón X)
popupImgClose.addEventListener("click", () => closePopup(popupImage));

// Cerrar por overlay
popupImage.addEventListener("mousedown", (e) => {
  if (e.target === popupImage) closePopup(popupImage);
});
