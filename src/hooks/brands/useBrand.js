import { _Brands } from "api/brand/brands";
import { useQuery } from "react-query";

export const useBrand = () => {
  const { data, isLoading } = useQuery(
    ["_Brands", ],
    () => _Brands.getBrands().then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
export const useOneBrand = ({id}) => {
  const { data, isLoading } = useQuery(
    ["_Brand", ],
    () => _Brands.getBrand({id}).then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
export const useBrandPage = (id) => {
  const { data, isLoading } = useQuery(
    ["_BrandPage", id],
    () => _Brands.getBrandPage(id).then((res) => res?.data),
    {
      keepPreviousData: true,
    }
  );
  return {
    data,
    isLoading,
  };
};
