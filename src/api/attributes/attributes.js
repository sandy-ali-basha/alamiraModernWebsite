import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import { _axios } from "../../interceptor/http-config";

export const _Attributes = {
  getAttributes: async (id) => {
    return _axios
      .get(`/product_attributes?all=false`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  getAttributeValues: async (id) => {
    return _axios
      .get(`/product_attributes_values/attribute/${id}?all=false`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
};
