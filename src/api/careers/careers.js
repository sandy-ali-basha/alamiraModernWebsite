import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import { _axios } from "../../interceptor/http-config";

export const _careers = {
  getCareers: async (id) => {
    return _axios
      .get(`/careers`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  getCareer: async (id) => {
    return _axios
      .get(`/careers/${id}`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
};
