
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import { _axios } from "../../interceptor/http-config";

export const _pay = {

    post: (data, setLoading) =>
        _axios.post("/user/order/chckout", data).then((res) => {
            setLoading(true);
            return res.data
        }),

    view: async (id) => {
        return _axios
            .get(
                `/user/order/chckout/${id}`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },

    update: ({ editedID, formData }) =>
        _axios.post('/user/order/chckout' + editedID, formData).then((res) => res),
};