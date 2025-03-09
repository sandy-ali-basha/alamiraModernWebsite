
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import { _axios } from "../../interceptor/http-config";
const session_id = localStorage.getItem("session_id");

export const _chckout = {

    post: (data, setLoading) =>
        _axios.post(`/user/order/checkout?s_id=${session_id}`, data).then((res) => {
            setLoading(true);
            return res.data
        }),

    view: async (id) => {
        return _axios
            .get(
                `/user/order/checkout/${id}?s_id=${session_id}`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },
};