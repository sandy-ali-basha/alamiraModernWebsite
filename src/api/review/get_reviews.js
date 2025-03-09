import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
export const _get_reviews = {
    index: async () => {
        return _axios
            .get(
                `/user/reviews`, {
                headers: {
                    ...HttpRequestInterceptor()
                }
            }
            )
            .then((res) => res.data);
    },

}