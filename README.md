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

src/
│
├── components/
│ ├── Card.js
│ ├── Section.js
│ ├── Popup.js
│ ├── PopupWithImage.js
│ ├── PopupWithForm.js
│ ├── UserInfo.js
│ └── FormValidator.js
│
├── pages/
│ ├── index.css
│ └── index.js
│
├── blocks/ # Estilos CSS organizados por bloques BEM
│
├── images/ # Imágenes y recursos locales
│
├── vendor/
│ └── normalize.css
│
└── index.html

## 🧩 Estructura de clases

| Clase              | Archivo                        | Responsabilidad principal                                                   |
| :----------------- | :----------------------------- | :-------------------------------------------------------------------------- |
| **Card**           | `components/Card.js`           | Crea, renderiza y gestiona eventos de cada tarjeta (like, delete, preview). |
| **Section**        | `components/Section.js`        | Renderiza y administra un conjunto de tarjetas.                             |
| **Popup**          | `components/Popup.js`          | Controla la apertura y cierre de cualquier ventana emergente.               |
| **PopupWithImage** | `components/PopupWithImage.js` | Extiende Popup para mostrar imágenes y leyendas.                            |
| **PopupWithForm**  | `components/PopupWithForm.js`  | Extiende Popup y maneja formularios con callbacks de envío.                 |
| **UserInfo**       | `components/UserInfo.js`       | Obtiene y actualiza los datos del usuario (nombre y descripción).           |
| **FormValidator**  | `components/FormValidator.js`  | Valida campos de entrada y controla el estado del botón de envío.           |

---

## 🧠 Tecnologías utilizadas

- **HTML5** (estructura semántica, accesible y responsiva)
- **CSS3** con metodología **BEM** (Bloque — Elemento — Modificador)
- **Flexbox** y **Grid Layout**
- **JavaScript (ES6+)**
  - Módulos (`import` / `export`)
  - Clases y herencia
  - Manipulación del DOM
  - Validación de formularios nativa
- **Git y GitHub Pages** para control de versiones y despliegue
- **Figma** como referencia de diseño

---

## 👨‍💻 Autor

**Felipe García**  
Desarrollador web en formación  
📧 Contacto: [ai.sprvvnt@gmail.com]

Feipe García
