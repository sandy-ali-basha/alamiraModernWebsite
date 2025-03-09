import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _all_color = {
    index: async () => {
        return _axios
            .get(
                `/user/all-color`
                , {
                    headers: {
                        ...HttpRequestInterceptor()
                    }
                })
            .then((res) => res.data.colors);
    },
}
