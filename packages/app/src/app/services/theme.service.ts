import { Injectable } from '@angular/core';
import { THEMES } from '@steveblack/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  lhKey = 'sb:theme';
  // tslint:disable-next-line:variable-name
  _theme = THEMES.light;
  set theme(val: THEMES) {
    const bodyEl = document.body;
    this.clearThemes();
    this._theme = val;
    bodyEl.classList.add(val);
    localStorage.setItem(this.lhKey, val);
  }
  get theme() {
    return this._theme;
  }

  constructor() {
    this.fetchTheme();
  }

  fetchTheme() {
    const theme = localStorage.getItem(this.lhKey);

    if (!theme) {
      this.theme = THEMES.light;
      return;
    }

    this.theme = THEMES[theme];
  }

  toggleTheme() {
    this.clearThemes();
    this.theme = this.theme === THEMES.dark
      ? THEMES.light
      : THEMES.dark;
  }

  clearThemes() {
    const bodyEl = document.body;

    Object.values(THEMES).forEach(theme => {
      bodyEl.classList.remove(theme);
    });
  }
}
