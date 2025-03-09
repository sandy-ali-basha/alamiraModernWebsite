import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _ProductApi = {
  index: async () => {
    try {
      const response = await _axios.get(`/product`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  filter: (data, setLoading) =>
    _axios.post(`/filter`, data,{
      headers: {
        ...HttpRequestInterceptor(), // Added headers
      },
    }).then((res) => {
      return res.data;
    }),
};
