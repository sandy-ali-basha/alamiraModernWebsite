import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _fav = {
  index: async () => {
    return _axios
      .get(`/order/my_fav`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
};
