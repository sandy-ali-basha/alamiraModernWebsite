import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import { _axios } from "../../interceptor/http-config";

export const _terms = {
  getTerms: async () => {
    return _axios
      .get(`/terms`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  getTerm: async (id) => {
    return _axios
      .get(`/terms/${id}`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
};
