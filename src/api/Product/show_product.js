import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _show_product = {
  index: async (id) => {
    return _axios
      .get(`product/${id}`, {
        headers: {
          lang: ["tr", "ar", "fr"].includes(localStorage.getItem("i18nextLng"))
            ? localStorage.getItem("i18nextLng")
            : "fr",
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  acc: async (id) => {
    return _axios
      .get(`product/${id}/accordion`, {
        headers: {
          lang: ["tr", "ar", "fr"].includes(localStorage.getItem("i18nextLng"))
            ? localStorage.getItem("i18nextLng")
            : "fr",
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  slider: async (id) => {
    return _axios
      .get(`product/slider/${id}`, {
        headers: {
          lang: ["tr", "ar", "fr"].includes(localStorage.getItem("i18nextLng"))
            ? localStorage.getItem("i18nextLng")
            : "fr",
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  features: async (id) => {
    return _axios
      .get(`products/${id}/images/products_features`, {
        headers: {
          lang: ["tr", "ar", "fr"].includes(localStorage.getItem("i18nextLng"))
            ? localStorage.getItem("i18nextLng")
            : "fr",
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
};
