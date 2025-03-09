import create from "zustand";

function storeMode(mode) {
  localStorage.setItem("mode", mode);
}

function storeDirection(lang) {
  localStorage.setItem("direction", lang);
}

function storeLanguage(lang) {
  localStorage.setItem("language", lang);
}

function getMode() {
  if (!!localStorage.getItem("mode")) {
    return localStorage.getItem("mode");
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
}

function getLang() {
  return localStorage.getItem("direction") || "ltr";
}

function getLanguage() {
  return localStorage.getItem("language") || "fr"; 
}

export const settingsStore = create((set) => ({
  direction: getLang(),
  language: getLanguage(),
  responsiveFontSizes: true,
  mode: getMode(),

  setDirection: (dir) => {
    set(() => ({ direction: dir }));
    storeDirection(dir);
  },

  setLanguage: (lang) => {
    set(() => ({ language: lang }));
    storeLanguage(lang);
  },

  setResponsiveFontSizes: (resFont) =>
    set(() => ({ responsiveFontSizes: resFont })),
  setMode: (mode) => {
    set(() => ({ mode: mode }));
    storeMode(mode);
  },
}));
