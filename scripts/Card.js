// scripts/Card.js

export default class Card {
  /**
   * Crear una Card desde datos y un template.
   * @param {{name:string, link:string, isLiked?: boolean, _id?: string}} data
   * @param {string} templateSelector  ej. '#card-template'
   * @param {{ handleImageClick: (name:string, link:string)=>void }} handlers
   */

  constructor(
    data,
    templateSelector,
    { handleImageClick, handleDeleteClick, handleLikeClick }
  ) {
    this._name = data.name;
    this._link = data.link;

    // Datos que vienen del servidor
    this._id = data._id || null; // ID de la tarjeta en el servidor
    this._isLiked = Boolean(data.isLiked); // estado inicial del like

    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    // Clases del proyecto
    this._imageClass = "card__image";
    this._titleClass = "card__title";
    this._likeBtnClass = "card__like";
    this._likeActiveClass = "card__like_active";
    this._likeIconClass = "card__like-icon";
    this._deleteBtnClass = "card__delete";

    // Iconos de like (exactamente como en el index.js)
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
    // Sincronizar el boolean interno con la vista
    this._isLiked = !!isActive;

    this._likeButton.classList.toggle(this._likeActiveClass, isActive);
    const icon = this._likeButton.querySelector(`.${this._likeIconClass}`);
    if (icon) icon.src = isActive ? this._iconFilled : this._iconOutline;
    this._likeButton.setAttribute("aria-pressed", isActive ? "true" : "false");
  }

  _handleLike = () => {
    if (this._handleLikeClick) {
      // Delegamos la lógica a index.js, pasando la instancia
      this._handleLikeClick(this);
    } else {
      // Fallback: si no hay handler, se comporta como antes (solo front)
      const nowActive = !this._isLiked;
      this._setLikeState(nowActive);
    }
  };

  // ====== /LIKE ======
  // Método público: elimina la tarjeta del DOM
  removeCard() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }

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

    // Eliminar: delega en el callback que viene desde index.js
    this._deleteButton.addEventListener("click", () => {
      if (this._handleDeleteClick) {
        this._handleDeleteClick(this); // le pasamos la instancia de Card
      }
    });

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
    this._setLikeState(this._isLiked);

    return this._element;
  }

  // ========= Métodos públicos útiles para likes =========
  // ID de la tarjeta en el servidor
  getId() {
    return this._id;
  }

  // ¿Está likeada esta tarjeta?
  isLiked() {
    return this._isLiked;
  }

  // Forzar estado de like desde fuera (tras respuesta de la API)
  setIsLiked(isLiked) {
    this._setLikeState(!!isLiked);
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

      // En hidratación no tenemos info de servidor
      isLiked: element
        .querySelector(".card__like")
        ?.classList.contains("card__like_active"),
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
