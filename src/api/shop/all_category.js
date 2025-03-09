import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _all_category = {
    index: async () => {
        return _axios
            .get(
                `/user/all-category`
                , {
                    headers: {
                        ...HttpRequestInterceptor()
                    }
                })
            .then((res) => res.data.categories);
    },
}