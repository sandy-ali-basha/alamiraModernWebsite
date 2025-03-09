import { _AuthApi } from "api/auth";
import { _axios as Axios } from "./http-config";
import i18n from "i18n";

export const HttpRequestInterceptor = () => {
  Axios.interceptors.request.use(
    function (request) {
      const access_token = _AuthApi.getToken();
      if (request.headers) {
        request.headers.Authorization = access_token
          ? `Bearer ${access_token}`
          : "";

        request.headers.Accept = "application/json";
        // Set the i18n.language current language using i18n's active language

        request.headers.locale = ["tr", "ar", "fr"].includes(i18n.language)
          ? i18n.language
          : "fr";
      }

      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
