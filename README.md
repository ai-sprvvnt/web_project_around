# Tripleten web_project_around

# Alrededor de los EE. UU.

Página interactiva con tarjetas de lugares. El usuario puede editar su perfil (nombre y rol) y dar “me gusta” a las fotos. Proyecto responsivo con maquetación basada en Figma.

> Demo: https://ai-sprvvnt.github.io/web_project_around/  
> Diseño: Figma “Around The U.S.” (versión Sprint 7)

---

## ✨ Funcionalidades

- **Maquetación responsiva**: sin scroll horizontal, **880 px** de contenido fijo en desktop (≥1280 px) y gutters en móvil/tablet.
- **Tarjetas**: grid con columnas **fijas** de **282 × 363** (imagen **282 × 282**).
- **Like accesible**: botón con SVG (estados desactivado/hover/activo) y `aria-pressed`.
- **Editar perfil**: popup modal centrado con fondo semitransparente, abre/cierra con botón, overlay y tecla `Esc`.
- **Fuentes e imágenes locales**: `Inter` y `Noto Serif` en `/fonts`, assets en `/images`.
- **BEM**: estructura y nombres de bloques siguiendo la metodología.

---

## 🧱 Estructura del proyecto

web_project_around/
├─ index.html
├─ pages/
│ └─ index.css
├─ blocks/
│ ├─ page/page.css
│ ├─ header/header.css
│ ├─ profile/profile.css
│ ├─ elements/elements.css
│ ├─ card/card.css
│ ├─ popup/popup.css
│ └─ footer/footer.css
├─ scripts/
│ └─ index.js
├─ images/
└─ fonts/
├─ inter-regular.woff2
├─ inter-700.woff2
├─ noto-serif-regular.woff2
└─ noto-serif-700.woff2

GitHub: https://github.com/ai-sprvvnt
