# Tripleten web_project_around

# Proyecto 11: Alrededor de los EE.UU. — Sprint 11

Este proyecto es parte del curso de Desarrollo Web de **TripleTen**.  
En este sprint se implementa la **programación orientada a objetos (POO)** en JavaScript, aplicando herencia, encapsulación y acoplamiento débil para refactorizar la funcionalidad del sitio “Alrededor de los EE.UU.”.

El sitio permite editar la información del perfil, agregar nuevas tarjetas con imágenes y títulos, dar “me gusta”, eliminar tarjetas y visualizar imágenes en tamaño completo mediante una ventana emergente.

---

## URLs

Demo: https://ai-sprvvnt.github.io/web_project_around/
Repositorio: ai-sprvvnt/web_project_around

## 🚀 Funcionalidad principal

- Mostrar tarjetas iniciales con nombre e imagen.
- Agregar nuevas tarjetas dinámicamente desde un formulario.
- Dar “like” a las tarjetas.
- Eliminar tarjetas individualmente.
- Editar el nombre y la descripción del perfil.
- Abrir una imagen en un popup ampliado con su descripción.
- Cierre de popups por botón, overlay o tecla **ESC**.
- Validación activa de formularios.
- Estructura del código basada en **clases ES6**.

## 📁 Estructura del proyectoweb_project_around/

```text
web_project_around/
├── index.html
├── pages/
│   └── index.css
├── blocks/
│   ├── header/
│   ├── profile/
│   ├── elements/
│   ├── card/
│   ├── popup/
│   ├── footer/
│   └── ... (otros bloques BEM)
├── scripts/
│   ├── index.js
│   ├── Api.js
│   ├── Card.js
│   ├── Section.js
│   ├── Popup.js
│   ├── PopupWithImage.js
│   ├── PopupWithForm.js
│   ├── PopupWithConfirmation.js
│   ├── UserInfo.js
│   └── FormValidator.js
├── images/
│   ├── around_vector.svg
│   ├── jacques.webp
│   ├── heart_vector.svg
│   ├── trash_vector.svg
│   ├── edit_avatar.svg
│   └── ... (otras imágenes)
├── vendor/
│   ├── normalize.css
│   └── fonts.css
├── .gitignore
└── README.md

## 🧩 Estructura de clases
| Clase                   | Archivo                            | Responsabilidad principal                                                                |
| ----------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------- |
| `Card`                  | `scripts/Card.js`                  | Crea, renderiza y gestiona eventos de cada tarjeta (like, delete, preview de imagen).    |
| `Section`               | `scripts/Section.js`               | Renderiza y administra un conjunto de elementos (tarjetas) en un contenedor específico.  |
| `Popup`                 | `scripts/Popup.js`                 | Clase padre para todas las ventanas emergentes: abre, cierra y maneja eventos genéricos. |
| `PopupWithImage`        | `scripts/PopupWithImage.js`        | Extiende `Popup` para mostrar una imagen ampliada con su descripción.                    |
| `PopupWithForm`         | `scripts/PopupWithForm.js`         | Extiende `Popup` y gestiona formularios (submit, estados de carga, cierre).              |
| `PopupWithConfirmation` | `scripts/PopupWithConfirmation.js` | Extiende `Popup` para confirmar la eliminación de tarjetas.                              |
| `UserInfo`              | `scripts/UserInfo.js`              | Gestiona la información del usuario en la interfaz (nombre, descripción, avatar).        |
| `FormValidator`         | `scripts/FormValidator.js`         | Valida formularios, muestra mensajes de error y controla el estado del botón submit.     |
| `Api`                   | `scripts/Api.js`                   | Encapsula todas las solicitudes a la API (usuario, tarjetas, likes y avatar).            |


## 🧠 Tecnologías utilizadas

- **HTML5** semántico.
- **CSS3**:
  - Metodología **BEM** (Bloque–Elemento–Modificador) para nombres de clases.
  - Estructura de archivos CSS por bloques (`blocks/`).
  - Layout con **Flexbox** y **Grid**.
  - Diseño adaptativo para diferentes anchos de pantalla.
- **JavaScript (ES6+)**:
  - Módulos ES (`import` / `export`).
  - Clases para encapsular lógica (Card, Section, Popup, Api, etc.).
  - Manejo de eventos, delegación y accesibilidad básica (ESC, Overlay, focus).
  - Validación de formularios con `ValidityState` y atributos HTML5.
  - Promesas y trabajo con **fetch**.
- **Interacción con API REST**:
  - `GET /users/me`, `PATCH /users/me`, `PATCH /users/me/avatar`.
  - `GET /cards`, `POST /cards`, `DELETE /cards/:cardId`.
  - `PUT /cards/:cardId/likes`, `DELETE /cards/:cardId/likes`.
- **Herramientas adicionales**:
  - `normalize.css`.
  - Fuentes locales declaradas en `vendor/fonts.css`.
  - Git & GitHub para control de versiones.

---

## 👨‍💻 Autor

**Felipe García**
Desarrollador web en formación
📧 Contacto: [ai.sprvvnt@gmail.com]

Feipe García
```
