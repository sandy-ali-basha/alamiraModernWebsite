import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _orders = {
  index: async () => {
    return _axios
      .get(`/order/my_orders`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
};
