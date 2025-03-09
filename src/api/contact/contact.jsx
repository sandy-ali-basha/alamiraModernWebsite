import { _axios } from "../../interceptor/http-config";

export const _contact = {
  post: (data, setLoading) =>
    _axios.post(`/contact`, data).then((res) => {
      setLoading(true);
      return res.data;
    }),
};
