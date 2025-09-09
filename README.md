# Around The U.S. — Sprint 7–8 (web_project_around)

Proyecto educativo realizado con **HTML/CSS/JS y metodología **BEM**.  
Objetivo: reproducir fielmente el diseño de **Figma**, mantener accesibilidad básica, y cumplir los Sprints 7–8.

## ✨ Funcionalidades
- [x] **6 tarjetas iniciales** renderizadas con JavaScript desde `initialCards`.
- [x] **Like accesible** (`aria-pressed`, 3 estados: normal/hover/activo).
- [x] **Eliminar tarjeta** por delegación (botón papelera dentro de cada `.card`).
- [x] **Añadir nueva tarjeta**: popup con formulario (`title`, `link`), inserta con `prepend`.
- [x] **Popups reutilizables**: abren/cierran por **X**, **overlay** y **Esc**.
- [x] **Popup de imagen** (máx **75vw × 75vh**, `figcaption` con el título).
- [x] **Responsive sin scroll horizontal**: contenedor centrado con anchos exactos por breakpoint.
- [x] **BEM** consistente; fuentes e imágenes **locales**.

## Accesibilidad
- Imágenes con `alt` (se toma del título).
- Botones sin texto con `aria-label`.
- Focus visible en controles relevantes (`:focus-visible`).
- Semántica: `header`, `main`, `section`, `footer`; jerarquía `h1/h2`.

## Tecnologías
- HTML5 + CSS3 (Grid/Flex, clamp, object-fit)
- JavaScript (ES6+, delegación de eventos)
- BEM
- Fuentes locales (`Inter`, `Noto Serif`) con `font-display: swap`
- `normalize.css`

## Cómo correr localmente
bash
# clona el repo
git clone <tu-repo>
cd web_project_around
# abre index.html con Live Server (VS Code) o tu servidor estático favorito

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

## Demo
- **GitHub Pages:** https://ai-sprvvnt.github.io/web_project_around/ (Settings → Pages → Deploy from branch → `main` / `/root`)
- Rama de producción: `main`
