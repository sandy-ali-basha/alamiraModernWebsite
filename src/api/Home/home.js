import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _Home = {
  all: async () => {
    return _axios.get(`/home`, { 
      headers: {
        ...HttpRequestInterceptor()
      }
    }).then((res) => res.data);
  },
};
