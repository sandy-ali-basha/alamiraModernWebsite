import { _axios } from "../../interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _addresses = {
  index: async () => {
    return _axios
      .get(`/addresses`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  get: async (id) => {
    return _axios
      .get(`/addresses/${id}`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res);
  },
  getOrderStatus: async (id) => {
    return _axios
      .get(`/order/my_orders/${id}`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res);
  },
  order: (data) => _axios.post("/order", data).then((res) => res.data),

  UpdateOrder: ({orderId, orderData}) => _axios.post(`/order/my_orders/${orderId}/change-payment`, orderData).then((res) => res.data),

  delete: (id) => _axios.delete(`/addresses/${id}`).then((res) => res.data),

  update: ({ id, data }) =>
    _axios.post(`/addresses/${id}`, data).then((res) => res?.data),

  post: (data) => _axios.post(`/addresses`, data).then((res) => res?.data),
  
};
