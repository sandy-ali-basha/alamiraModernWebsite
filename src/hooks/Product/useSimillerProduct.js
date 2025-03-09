import { useQuery } from "react-query";

import { _similler_product } from "api/Product/similler_products";


export const useSimillerProduct = (id) => {
    const { data, isLoading } = useQuery(
        [`product-similar-${id}`],
        () => _similler_product.index(id).then((res) => res),
        {
            keepPreviousData: true,
        }
    );
    return {
        data,
        isLoading,
    };
};
