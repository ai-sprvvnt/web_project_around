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
