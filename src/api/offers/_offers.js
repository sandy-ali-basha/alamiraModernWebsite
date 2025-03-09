import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _offers = {
  index: async () => {
    return _axios
      .get(`/product/offers`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
};
