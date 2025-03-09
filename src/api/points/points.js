import { _axios } from "../../interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _points = {
  get: async () => {
    return _axios
      .get(`/user/my-points`, {
        headers: HttpRequestInterceptor(),
      })
      .then((res) => res.data);
  },
};
