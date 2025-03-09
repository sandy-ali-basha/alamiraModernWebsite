import { _axios } from "../../interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _blogs = {
  getBlogs: async () => {
    return _axios
      .get(`/blog`, {
        headers: HttpRequestInterceptor(),
      })
      .then((res) => res.data);
  },
  getBlog: async (id) => {
    return _axios
      .get(`/blog/${id}`, {
        headers: HttpRequestInterceptor(),
      })
      .then((res) => res.data);
  },

};
