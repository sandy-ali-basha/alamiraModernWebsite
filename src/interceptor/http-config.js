import axios from "axios";
import { settingsStore } from "store/settingsStore";

const { REACT_APP_API_URL } = process.env;

// Get the latest language and direction from Zustand store
const language = settingsStore.getState().language;

export const _axios = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    locale: language,
    city: localStorage.getItem("city"),
  },
});
