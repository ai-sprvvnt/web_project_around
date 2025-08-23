// Like / Unlike
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card__like")) {
    e.target.classList.toggle("card__like--active");
  }
  if (e.target.classList.contains("card__delete")) {
    const card = e.target.closest(".card");
    if (card) card.remove();
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

/* helpers */
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
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
