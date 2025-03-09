import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";


export const _similler_product = {
    index: async (id) => {
        return _axios
            .get(
                `product/similar/${id}`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },
};