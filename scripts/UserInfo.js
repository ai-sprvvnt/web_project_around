// scripts/UserInfo.js

export default class UserInfo {
  /**
   * @param {{ nameSelector: string, aboutSelector: string }} params
   */
  constructor({ nameSelector, aboutSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._aboutEl = document.querySelector(aboutSelector);

    if (!this._nameEl) {
      throw new Error(`UserInfo: no se encontró el elemento "${nameSelector}"`);
    }
    if (!this._aboutEl) {
      throw new Error(
        `UserInfo: no se encontró el elemento "${aboutSelector}"`
      );
    }
  }

  /**
   * Devuelve la info actual mostrada en la página.
   * Útil para prefillear el popup de "Editar perfil".
   * @returns {{ name: string, about: string }}
   */
  getUserInfo() {
    return {
      name: this._nameEl.textContent?.trim() || "",
      about: this._aboutEl.textContent?.trim() || "",
    };
  }

  /**
   * Recibe datos nuevos y actualiza la UI.
   * Acepta llaves flexibles: name/fullname y about/role/job.
   * @param {{ name?: string, fullname?: string, about?: string, role?: string, job?: string }}
   */
  setUserInfo({ name, fullname, about, role, job }) {
    const nextName = (name ?? fullname ?? "").trim();
    const nextAbout = (about ?? role ?? job ?? "").trim();

    if (nextName) this._nameEl.textContent = nextName;
    if (nextAbout) this._aboutEl.textContent = nextAbout;
  }
}
