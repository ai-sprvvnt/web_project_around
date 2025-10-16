# Tripleten web_project_around

Alrededor de los EE.UU. — Sprint 10

Proyecto educativo de una galería interactiva con tarjetas: editar perfil, añadir lugares, dar “like”, eliminar y previsualizar imagen en un modal. En este sprint se refactorizó a POO con clases ES6 y módulos ES.

Demo: https://ai-sprvvnt.github.io/web_project_around/
Repositorio: ai-sprvvnt/web_project_around

🎯 Objetivos del Sprint 10

Reescritura a clases:

Card para encapsular toda la lógica de una tarjeta.

FormValidator para validar formularios de forma reutilizable.

Separación del código en módulos ES (type="module").

Limpieza de listeners globales y responsabilidad única por componente.

Renderizado de todas las tarjetas iniciales desde JavaScript.

✨ Funcionalidades

Editar perfil: abre modal, valida campos, guarda y cierra.

Añadir tarjeta: abre modal, valida, crea tarjeta y la agrega al inicio.

Like en tarjeta: alterna estado y cambia icono (accesible con Enter/Espacio).

Eliminar tarjeta.

Vista ampliada: clic en imagen abre modal con caption.

Cierre de modales: por botón, clic en overlay y tecla Esc.

Validación “universal” con clase FormValidator, botón de enviar desactivado si hay errores.

🧱 Estructura del proyecto
web_project_around/
├─ images/ # recursos .webp, íconos (heart_vector.svg, etc.)
├─ pages/
│ └─ index.css # estilos principales
├─ scripts/
│ ├─ index.js # orquestación principal (ES module)
│ ├─ Card.js # clase Card
│ ├─ FormValidator.js # clase FormValidator
│ └─ utils.js # openPopup, closePopup, setPopupCloseHandlers
├─ vendor/
│ ├─ normalize.css
│ └─ fonts.css
├─ favicon.ico # favicon multiresolución
├─ index.html
└─ README.md

🧩 Clases y módulos
Card

Encapsula una tarjeta (crear DOM desde <template>, listeners y handlers internos).

Constructor: new Card({ name, link }, '#card-template', { handleImageClick })

Público:

getView() → HTMLElement listo para insertar.

Interno:

Like (.card**like, estado .card**like_active + cambio de icono).

Eliminar (.card\_\_delete).

Preview (clic en .card\_\_image llama a handleImageClick(name, link)).

Clases BEM usadas por la tarjeta:

card, card**image, card**title, card**like, card**like_active, card**like-icon, card**delete.

FormValidator

🚀 Deploy en GitHub Pages

En GitHub, ve a Settings → Pages.

Source: Deploy from a branch.

Branch: main (o la que uses) y carpeta /root.

Guarda. Espera a que aparezca la URL bajo “Your site is live”.

Si usas rutas relativas (./images/...), la página funcionará tanto local como en Pages.

🧰 Tecnologías y prácticas

HTML5 semántico, BEM en CSS.

normalize.css + fonts.css.

ES6 Modules y POO.

Manipulación de DOM segura (textContent, setAttribute).

Gestión de eventos con responsabilidades por componente.

Imágenes .webp y favicon multiresolución.

👨‍🏫 Autor
Feipe García
