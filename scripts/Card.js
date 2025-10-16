// scripts/Card.js

export default class Card {
  /**
   * Crear una Card desde datos y un template.
   * @param {{name:string, link:string}} data
   * @param {string} templateSelector  ej. '#card-template'
   * @param {{ handleImageClick: (name:string, link:string)=>void }} handlers
   */
  constructor(data, templateSelector, { handleImageClick }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;

    // Clases de tu proyecto
    this._imageClass = "card__image";
    this._titleClass = "card__title";
    this._likeBtnClass = "card__like";
    this._likeActiveClass = "card__like_active";
    this._likeIconClass = "card__like-icon";
    this._deleteBtnClass = "card__delete";

    // Iconos de like (exactamente como en tu index.js)
    this._iconFilled = "./images/heart_filled_vector.svg";
    this._iconOutline = "./images/heart_vector.svg";
  }

  // Crea el nodo desde el template
  _getTemplate() {
    const tmpl = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card");
    return tmpl.cloneNode(true);
  }

  // ====== LIKE ======
  _setLikeState(isActive) {
    this._likeButton.classList.toggle(this._likeActiveClass, isActive);
    const icon = this._likeButton.querySelector(`.${this._likeIconClass}`);
    if (icon) icon.src = isActive ? this._iconFilled : this._iconOutline;
    this._likeButton.setAttribute("aria-pressed", isActive ? "true" : "false");
  }

  _handleLike = () => {
    const nowActive = !this._likeButton.classList.contains(
      this._likeActiveClass
    );
    this._setLikeState(nowActive);
  };
  // ====== /LIKE ======

  _handleDelete = () => {
    this._element.remove();
    this._element = null;
  };

  _handlePreview = () => {
    this._handleImageClick?.(this._name, this._link);
  };

  _setEventListeners() {
    // Like
    this._likeButton.addEventListener("click", this._handleLike);
    this._likeButton.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        this._likeButton.click();
      }
    });

    // Eliminar
    this._deleteButton.addEventListener("click", this._handleDelete);

    // Imagen (ampliar)
    this._image.addEventListener("click", this._handlePreview);
  }

  // Metodo público principal
  getView() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(`.${this._imageClass}`);
    this._title = this._element.querySelector(`.${this._titleClass}`);
    this._likeButton = this._element.querySelector(`.${this._likeBtnClass}`);
    this._deleteButton = this._element.querySelector(
      `.${this._deleteBtnClass}`
    );

    // Datos
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();
    // Estado inicial del like (por si en el futuro llega desde datos)
    this._setLikeState(false);
    return this._element;
  }

  // ========= Hidratación de tarjetas estáticas existentes =========
  /**
   * Hidrata una tarjeta que ya está en el DOM con la misma estructura BEM.
   * @param {HTMLElement} element  .card existente
   * @param {{ handleImageClick: (name:string, link:string)=>void }} handlers
   * @returns {Card}
   */
  static hydrate(element, { handleImageClick }) {
    const img = element.querySelector(".card__image");
    const titleEl = element.querySelector(".card__title");
    const data = {
      name: titleEl?.textContent?.trim() || img?.alt || "",
      link: img?.src || "",
    };
    const instance = new Card(data, "#card-template", { handleImageClick });
    // En hidratación, no creamos un nuevo nodo; usamos el existente
    instance._element = element;
    instance._image = element.querySelector(".card__image");
    instance._title = element.querySelector(".card__title");
    instance._likeButton = element.querySelector(".card__like");
    instance._deleteButton = element.querySelector(".card__delete");

    instance._setEventListeners();

    // No forzar estado de like: respeta si el botón ya trae clase activa
    const isActive =
      instance._likeButton?.classList?.contains("card__like_active");
    instance._setLikeState(!!isActive);
    return instance;
  }
}
