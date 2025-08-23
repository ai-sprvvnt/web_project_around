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
