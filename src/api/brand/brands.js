import { _axios } from "../../interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _Brands = {
  getBrands: async () => {
    return _axios
      .get(`/brand`, {
        headers: HttpRequestInterceptor(),
      })
      .then((res) => res.data);
  },
  getBrandPage: async (id) => {
    return _axios
      .get(`/brand_pages/${id}`, {
        headers: HttpRequestInterceptor(),
      })
      .then((res) => res.data);
  },

};
