import { _ProductApi } from "api/Product/product";
import { useQuery } from "react-query";

export const useProducts = (body) => {
  const { data, isLoading } = useQuery(
    ["product", body],
    () => _ProductApi.filter(body).then((res) => res),
    {
      keepPreviousData: true,
      enabled: !!body,
    }
  );
  return {
    data,
    isLoading,
  };
};
export const useAllProducts = () => {
  const { data, isLoading } = useQuery(
    ["product"],
    () => _ProductApi.filter().then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
