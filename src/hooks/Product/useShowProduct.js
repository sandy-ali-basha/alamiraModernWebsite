import { useQuery } from "react-query";

import { _show_product } from "api/Product/show_product";

export const useShowProduct = (id) => {
  const { data, isLoading } = useQuery(
    [`product/${id}`],
    () => _show_product.index(id).then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
export const useGetAccourdion = (id) => {
  const { data, isLoading } = useQuery(
    [`product acc/${id}`],
    () => _show_product.acc(id).then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
export const useGetSlider = (id) => {
  const { data, isLoading } = useQuery(
    [`product slider/${id}`],
    () => _show_product.slider(id).then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
export const useGetFeatures = (id) => {
  const { data, isLoading } = useQuery(
    [`productFeatures/${id}`],
    () => _show_product.features(id).then((res) => res),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
