import { _AuthApi } from "api/auth";
import { _axios as Axios } from "../interceptor/http-config";
import i18n from "i18n";

const showSnackbar = (enqueueSnackbar, message, variant) => {
  enqueueSnackbar(message, {
    variant,
    autoHideDuration: 2000,
    anchorOrigin: { vertical: "bottom", horizontal: "right" },
  });
};

export const HttpResponseInterceptor = (navigate, enqueueSnackbar) => {
  Axios.interceptors.response.use(
    function (response) {
      switch (response?.config?.method) {
        case "post":
          showSnackbar(
            enqueueSnackbar,
            i18n.language === "ar" ? "تم" : "Done",
            "success"
          );
          break;
        case "put":
          showSnackbar(
            enqueueSnackbar,
            i18n.language === "ar" ? "تم التعديل" : "Updated",
            "success"
          );
          break;
        case "patch":
          showSnackbar(
            enqueueSnackbar,
            response?.data?.error?.message,
            i18n.language === "ar" ? "تمت العملية بنجاح" : "success"
          );
          break;
        case "delete":
          showSnackbar(
            enqueueSnackbar,
            i18n.language === "ar" ? "تم الحذف" : "Deleted",
            "success"
          );
          break;
        default:
          break;
      }
      return response;
    },
    function (error) {
      console.log("error?.response?.data?.code", error?.response?.data?.code);
      switch (error?.response?.data?.code) {
        case 404:
          showSnackbar(
            enqueueSnackbar,
            error.response?.data?.error?.message,
            "error"
          );
          break;
        case 422:
          Object.keys(error.response?.data?.error?.message).map((key) => {
            showSnackbar(
              enqueueSnackbar,
              error.response?.data?.error?.message[key],
              "error"
            );
            return error.response?.data?.error?.message[key];
          });
          break;
        case 500:
          showSnackbar(
            enqueueSnackbar,
            error.response?.data?.error?.message,
            "error"
          );
          break;
        case 400:
          showSnackbar(
            enqueueSnackbar,
            error.response?.data?.error?.message,
            "error"
          );
          break;
        case 405:
          showSnackbar(
            enqueueSnackbar,
            error.response?.data?.error?.message,
            "error"
          );
          break;
        case 406:
          showSnackbar(enqueueSnackbar, "ERROR 406", "error");
          break;
        case 401:
          // _AuthApi.destroyToken();
          // navigate("/");
          showSnackbar(
            enqueueSnackbar,
            error.response?.data?.error?.message,
            "error"
          );
          break;
        case 403:
          _AuthApi.destroyToken();
          navigate("/");
          break;
        default:
          showSnackbar(enqueueSnackbar, error.response?.data?.message, "error");
          break;
      }
      return Promise.reject(error);
    }
  );
};
